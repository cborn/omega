package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FACULTY'])
class QuestionController {

    QuestionService questionService
    AWSUploaderService AWSUploaderService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond questionService.list(params), model: [questionCount: questionService.count()]
    }

    def show(Long id) {
        respond questionService.get(id)
    }

    def removeImage() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }
        Site site = question.page.lesson.course.term.site;


        AWSUploaderService.remove(params.image, "images",site)

        ImageProperty p = ImageProperty.findByAwsKey(params.image)

        p.delete(flush: true)


        String images = question.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name)

        if (images != null) {
            if (images.contains("@@")) {
                def imagesArray = images.split("@@").toList()

                imagesArray.remove(p.awsKey)

                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, imagesArray.join("@@"))
            } else {
                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, images.replace(p.awsKey, ""))
            }
        }


        question.save(flush: true)

        respond question, [status: OK, view: "show"]

    }

    def addImage() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }


        Site site = question.page.lesson.course.term.site;

        def response = AWSUploaderService.upload(params.image, "images",site)

        ImageProperty im = new ImageProperty()
        im.setAutoPlay(false)
        im.setAwsKey(response.awsKey)
        im.setAwsUrl(response.s3FileUrl)
        im.setSite(site);
        im.save(flush: true)


        String images = question.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name)

        if (images != null && images.length() > 0) {
            if (images.contains("@@")) {
                def imagesArray = images.split("@@").toList()

                imagesArray.add(im.awsKey.toString())

                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, imagesArray.join("@@"))
            } else {
                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, (images + "@@" + im.awsKey))
            }
        } else {
            question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, im.awsKey.toString())
        }
        question.save(flush: true)

        respond question, [status: OK, view: "show"]


    }


    def addPromptImage() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }


        Site site = question.page.lesson.course.term.site;

        def response = AWSUploaderService.upload(params.image, "images",site)

        ImageProperty im = new ImageProperty()
        im.setAutoPlay(false)
        im.setAwsKey(response.awsKey)
        im.setAwsUrl(response.s3FileUrl)
        im.setSite(site);
        im.save(flush: true)

        question.imagePrompt = im

        question.save(flush: true)

        respond question, [status: OK, view: "show"]


    }

    def removePromptImage() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }
        ImageProperty property = ImageProperty.findById(question.imagePrompt.id)
        question.imagePrompt = null
        question.save(flush: true)
        property.delete(flush: true)

        respond question, [status: OK, view: "show"]

    }


    def removePromptRecording() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }
        AudioProperty property = AudioProperty.findById(question.audioPrompt.id)
        question.audioPrompt = null
        question.save(flush: true)
        property.delete(flush: true)

        respond question, [status: OK, view: "show"]

    }

    def removeFeedbackRecording() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }
        AudioProperty property = AudioProperty.findById(question.audioFeedback.id)
        question.audioFeedback = null
        question.save(flush: true)
        property.delete(flush: true)

        respond question, [status: OK, view: "show"]

    }


    def addPromptRecording() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }


        Site site = question.page.lesson.course.term.site;

        def response = AWSUploaderService.upload(params.audio_data, "audio",site)

        AudioProperty im = new AudioProperty()
        im.setAutoPlay(false)
        im.setAwsKey(response.awsKey)
        im.setAwsUrl(response.s3FileUrl)
        im.setSite(site);
        im.save(flush: true)


        question.audioPrompt = im

        question.save(flush: true)

        respond question, [status: OK, view: "show"]


    }

    def addFeedbackRecording() {

        def question = Question.get(params.id)

        if (question == null) {
            render status: NOT_FOUND
            return
        }

        Site site = question.page.lesson.course.term.site;

        def response = AWSUploaderService.upload(params.audio_data, "audio",site)

        AudioProperty im = new AudioProperty()
        im.setAutoPlay(false)
        im.setAwsKey(response.awsKey)
        im.setAwsUrl(response.s3FileUrl)
        im.setSite(site)
        im.save(flush: true)


        question.audioFeedback = im

        question.save(flush: true)

        respond question, [status: OK, view: "show"]


    }

    def save(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view: 'create'
            return
        }

        respond question, [status: CREATED, view: "show"]
    }

    def update(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view: 'edit'
            return
        }

        respond question, [status: OK, view: "show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        Question question = Question.get(id)

        // reorder the questions now that this one has been deleted.

        def allQuestionsInGroup = Question.findByPage(question.page)

        for (Question loopQuestion : allQuestionsInGroup) {
            if (loopQuestion.position > question.position) {
                loopQuestion.position--
                println loopQuestion.position
                loopQuestion.save(flush: true)
            }
        }



        questionService.delete(id)

        render status: NO_CONTENT
    }
}
