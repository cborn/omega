package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FACULTY', 'ROLE_GRADER', 'ROLE_STUDENT'])
class QuestionResponseController {

    QuestionResponseService questionResponseService
    transient AWSUploaderService
    transient springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", addRecording: "POST", addTextComment: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond questionResponseService.list(params), model:[questionResponseCount: questionResponseService.count()]
    }


    def addTextComment(){
        QuestionResponse questionResponse = QuestionResponse.get(params.responseId);

        if(!questionResponse) {
            respond questionResponse, [status: NOT_FOUND]
        }

        Comment c = new Comment();
        c.submitted = new Date();
        c.user = springSecurityService.getCurrentUser();
        c.comment_text  = params.text_data;
        c.location = Double.parseDouble(params.start != null ? params.start : "0")
        c.endLocation = Double.parseDouble(params.end != null ? params.end : "0")
        c.save(flush:true)

        questionResponse.addToComments(c);

        questionResponse.setStatus(QuestionStatus.COMMENTS_PENDING);

        questionResponse.save(flush:true);

        respond questionResponse, [status: OK, view:"show"]

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
        c.location = Double.parseDouble(params.start)
        c.endLocation = Double.parseDouble(params.end)
        c.save(flush:true)

        questionResponse.addToComments(c);

        questionResponse.setStatus(QuestionStatus.COMMENTS_PENDING);

        questionResponse.save(flush:true);

        respond questionResponse, [status: OK, view:"show"]
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
