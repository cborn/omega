package omega

import grails.converters.JSON
import grails.gsp.PageRenderer
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import grails.web.http.HttpHeaders
import groovy.json.JsonBuilder
import org.grails.web.json.JSONObject

import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class LessonPageController {

    LessonPageService lessonPageService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        Lesson lesson = Lesson.get(params.lessonId)
        respond LessonPage.findAllByLesson(lesson).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]
    }


    def moveUp(Long id) {
        LessonPage lp = LessonPage.get(id)
        Lesson l = lp.lesson
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder + 1,l)

        lp.pageOrder++
        lp2.pageOrder--


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]

    }


    def moveDown(Long id) {
        LessonPage lp = LessonPage.get(id)
        Lesson l = lp.lesson
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder - 1,l)


        lp.pageOrder--
        lp2.pageOrder++


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]

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
            respond lessonPage.errors, view:'create'
            return
        }

        respond lessonPage, [status: CREATED, view:"show"]
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
                respond lessonPage.errors, view:'edit'
                return
            }


        }

        respond lessonPage, [status: OK, view:"show"]
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
        def pageAsJson = new JsonBuilder(extract).toPrettyString();

        Site site = page.lesson.course.term.site;



        // we've got the data now so lets zip it up :


        ByteArrayOutputStream baos = new ByteArrayOutputStream()
        ZipOutputStream zipFile = new ZipOutputStream(baos)

        ByteArrayInputStream bais = new ByteArrayInputStream(pageAsJson.getBytes());

        zipFile.putNextEntry(new ZipEntry("lessonPage.json"))

        byte[] bytes = new byte[1024];
        int length;
        while((length = bais.read(bytes)) >= 0 ) {
            zipFile.write(bytes, 0, length);
        }
        zipFile.closeEntry();

        for(QuestionExtract q in extract.questions) {

            this.getQuestionProperties(q, zipFile,site.getAwsUrl(""));

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

    void getQuestionProperties(QuestionExtract q, ZipOutputStream zipFile, String awsUrl) {

        if(!q.getImagePrompt().isNull) {
            extractProperty(q.getImagePrompt(), zipFile);
        }

        if(!q.getImageFeedback().isNull) {
            extractProperty(q.getImageFeedback(), zipFile);
        }

        if(!q.getAudioPrompt().isNull) {
            extractProperty(q.getAudioPrompt(), zipFile);
        }

        if(!q.getAudioFeedback().isNull) {
            extractProperty(q.getAudioFeedback(), zipFile);
        }


        if(!q.getVideoPrompt().isNull) {
            extractProperty(q.getVideoPrompt(), zipFile);
        }

        if(!q.getVideoFeedback().isNull) {
            extractProperty(q.getVideoFeedback(), zipFile);
        }

        if(q.custom_properties.containsKey(Question.QuestionPropertyKeys.IMAGES.key_name)) {
            extractImageList(q.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name).toString(),zipFile,awsUrl + "images/");
        }


    }

    void extractImageList(String images, ZipOutputStream zipFile, String awsUrl) {

        for(String imageKey in images.split("@@")) {

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
