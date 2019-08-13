package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class QuestionResponseController {

    QuestionResponseService questionResponseService
    transient AWSUploaderService
    transient springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond questionResponseService.list(params), model:[questionResponseCount: questionResponseService.count()]
    }

    def addRecording() {

        QuestionResponse questionResponse = QuestionResponse.get(params.responseId);

        if(!questionResponse) {
            respond questionResponse, [status: NOT_FOUND]
        }

        def response = AWSUploaderService.upload(params.audio_data,"audio");

        AudioProperty audio = new AudioProperty();
        audio.setAutoPlay(false)
        audio.setAwsKey(response.awsKey);
        audio.setAwsUrl(response.s3FileUrl);
        audio.save(flush:true);


        Comment c = new Comment();
        c.submitted = new Date();
        c.user = springSecurityService.getCurrentUser();
        c.voice_clip  = response.awsKey;
        c.save(flush:true)

        questionResponse.addToComments(c);

        questionResponse.save(failOnError:true,flush:true);

        respond questionResponse, [status: OK, view:"addRecording"]
    }

    def show(Long id) {
        respond questionResponseService.get(id)
    }

    def save(QuestionResponse questionResponse) {
        if (questionResponse == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionResponseService.save(questionResponse)
        } catch (ValidationException e) {
            respond questionResponse.errors, view:'create'
            return
        }

        respond questionResponse, [status: CREATED, view:"show"]
    }

    def update(QuestionResponse questionResponse) {
        if (questionResponse == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionResponseService.save(questionResponse)
        } catch (ValidationException e) {
            respond questionResponse.errors, view:'edit'
            return
        }

        respond questionResponse, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        questionResponseService.delete(id)

        render status: NO_CONTENT
    }
}
