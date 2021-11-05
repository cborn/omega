package omega

import grails.converters.JSON
import grails.gsp.PageRenderer
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import grails.web.http.HttpHeaders
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import org.apache.commons.fileupload.disk.DiskFileItem
import org.grails.web.json.JSONObject
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.commons.CommonsMultipartFile

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.text.SimpleDateFormat
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream
import java.util.zip.ZipOutputStream

import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FACULTY', 'ROLE_GRADER', 'ROLE_STUDENT'])
class LessonPageController {

    LessonPageService lessonPageService
    AWSUploaderService AWSUploaderService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        Lesson lesson = Lesson.get(params.lessonId)
        respond LessonPage.findAllByLesson(lesson).sort { it.pageOrder }, model: [lessonPageCount: lessonPageService.count()]
    }


    def moveUp(Long id) {
        LessonPage lp = LessonPage.get(id)
        Lesson l = lp.lesson
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder + 1, l)

        lp.pageOrder++
        lp2.pageOrder--


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort { it.pageOrder }, model: [lessonPageCount: lessonPageService.count()]

    }


    def moveDown(Long id) {
        LessonPage lp = LessonPage.get(id)
        Lesson l = lp.lesson
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder - 1, l)


        lp.pageOrder--
        lp2.pageOrder++


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort { it.pageOrder }, model: [lessonPageCount: lessonPageService.count()]

    }


    def show(Long id) {
        respond lessonPageService.get(id)
    }

    def save(LessonPage lessonPage) {
        if (lessonPage == null) {
            render status: NOT_FOUND
            return
        }

        lessonPage.pageOrder = lessonPage.lesson.pages.size()

        try {
            lessonPageService.save(lessonPage)
        } catch (ValidationException e) {
            respond lessonPage.errors, view: 'create'
            return
        }

        respond lessonPage, [status: CREATED, view: "show"]
    }


    def update(LessonPage lessonPage) {
        if (lessonPage == null) {
            render status: NOT_FOUND
            return
        }

        LessonPage.withNewTransaction {
            lessonPage.attach()


            try {
                lessonPageService.save(lessonPage)
            } catch (ValidationException e) {
                respond lessonPage.errors, view: 'edit'
                return
            }


        }

        respond lessonPage, [status: OK, view: "show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        lessonPageService.delete(id)

        render status: NO_CONTENT
    }

    def export(Long id) {

        LessonPage page = LessonPage.findById(id);
        LessonPageExtract extract = page.extract();
        def pageAsJson = new JsonBuilder(extract).toString();

        Site site = page.lesson.course.term.site;


        // we've got the data now so lets zip it up :


        ByteArrayOutputStream baos = new ByteArrayOutputStream()
        ZipOutputStream zipFile = new ZipOutputStream(baos)

        ByteArrayInputStream bais = new ByteArrayInputStream(pageAsJson.getBytes());

        zipFile.putNextEntry(new ZipEntry("lessonPage.json"))

        byte[] bytes = new byte[1];
        int length;
        while ((length = bais.read(bytes)) >= 0) {
            zipFile.write(bytes, 0, length);
        }
        zipFile.closeEntry();

        for (QuestionExtract q in extract.questions) {

            this.getQuestionProperties(q, zipFile, site.getAwsUrl(""));

        }


        zipFile.close();
        bais.close();
        baos.close();

        response.setHeader("Content-disposition", "filename=\"${page.name + "-extract"}.zip\"")
        response.setHeader('Access-Control-Expose-Headers', HttpHeaders.CONTENT_DISPOSITION);
        response.contentType = "application/zip"
        response.outputStream << baos.toByteArray()
        response.outputStream.flush()


    }

    def importAction() {


        MultipartFile file = params.zipFile;

        println(file);

        ZipInputStream zis = new ZipInputStream(file.getInputStream());

        String id = UUID.randomUUID().toString();

        Path outDir = Paths.get(System.getenv("LL_IMPORT_DIR") + id);
        Files.createDirectories(outDir);

        byte[] buffer = new byte[1];

        List<String> resources = new ArrayList<>();

        ZipEntry entry = null;
        while ((entry = zis.getNextEntry()) != null) {
            System.out.println(entry.getName());

            if (!entry.getName().equalsIgnoreCase('lessonPage.json')) {
                resources.add(entry.getName());
            }

            Path filePath = outDir.resolve(entry.getName());
            FileOutputStream fos = new FileOutputStream(filePath.toFile())
            BufferedOutputStream bos = new BufferedOutputStream(fos, buffer.length)

            int len;
            while ((len = zis.read(buffer)) > 0) {
                bos.write(buffer, 0, len);
            }

        }

        zis.close();


        // Now we have extracted the files - lets process them

        File f = new File(outDir.toString() + '/lessonPage.json');
        def slurper = new JsonSlurper()
        def jsonText = f.getText()
        def json = slurper.parseText(jsonText)

        Lesson lesson = Lesson.get(params.id);
        LessonPage page = new LessonPage(json);
        page.lesson = lesson;

        if(json.dueDate != null) {
            page.setDueDate(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(json.dueDate));
        }
        page.pageOrder = lesson.pages.size();

        page.clearErrors();

        for (Question q : page.questions) {
            q.setPage(page);
            if (q.audioFeedback != null)
                q.audioFeedback.site = lesson.course.term.site;
            if (q.audioPrompt != null)
                q.audioPrompt.site = lesson.course.term.site;
            if (q.imagePrompt != null)
                q.imagePrompt.site = lesson.course.term.site;
            if (q.imageFeedback != null)
                q.imageFeedback.site = lesson.course.term.site;
            if (q.videoPrompt != null)
                q.videoPrompt.site = lesson.course.term.site;

        }


        for (String resource : resources) {
            File resourceFile = new File(outDir.toString() + '/' + resource);
            def response = AWSUploaderService.uploadWithKey(resourceFile, "audio", page.lesson.course.term.site, resource);
        }

        page.save([flush: true, failOnError: true]);


        respond page


    }


    void getQuestionProperties(QuestionExtract q, ZipOutputStream zipFile, String awsUrl) {

        if (q.getImagePrompt() != null) {
            extractProperty(q.getImagePrompt(), zipFile);
        }

        if (q.getImageFeedback() != null) {
            extractProperty(q.getImageFeedback(), zipFile);
        }

        if (q.getAudioPrompt() != null) {
            extractProperty(q.getAudioPrompt(), zipFile);
        }

        if (q.getAudioFeedback() != null) {
            extractProperty(q.getAudioFeedback(), zipFile);
        }


        if (q.getVideoPrompt() != null) {
            extractProperty(q.getVideoPrompt(), zipFile);
        }

        if (q.getVideoFeedback() != null) {
            extractProperty(q.getVideoFeedback(), zipFile);
        }

        if (q.custom_properties.containsKey(Question.QuestionPropertyKeys.IMAGES.key_name)) {
            extractImageList(q.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name).toString(), zipFile, awsUrl + "images/");
        }


    }

    void extractImageList(String images, ZipOutputStream zipFile, String awsUrl) {

        for (String imageKey in images.split("@@")) {

            // Go through properties and download them into the zip file.
            zipFile.putNextEntry(new ZipEntry(imageKey))


            ByteArrayInputStream bais = new ByteArrayInputStream(new URL(awsUrl + imageKey).getBytes())

            byte[] bytes = new byte[1024];
            int length;
            while ((length = bais.read(bytes)) >= 0) {
                zipFile.write(bytes, 0, length);
            }
            zipFile.closeEntry();
        }

    }


    void extractProperty(PropertyExtract p, ZipOutputStream zipFile) {

        // Go through properties and download them into the zip file.
        zipFile.putNextEntry(new ZipEntry(p.awsKey))

        ByteArrayInputStream bais = new ByteArrayInputStream(new URL(p.awsUrl).getBytes())

        byte[] bytes = new byte[1024];
        int length;
        while ((length = bais.read(bytes)) >= 0) {
            zipFile.write(bytes, 0, length);
        }
        zipFile.closeEntry();

    }


}
