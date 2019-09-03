package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*


@Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FACULTY', 'ROLE_GRADER', 'ROLE_STUDENT'])
class SubmissionController {

    SubmissionService submissionService
    def springSecurityService
    def AWSUploaderService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", addRecording: "POST"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        Term term = Term.findByCurrent(true);

        if(params.term != null){
            term = Term.get(params.term);
        }

        LessonPage page = LessonPage.get(params.lessonPageId);

        if (page == null) {
            if (!(springSecurityService.getCurrentUser() as User).isStudent()) {
                respond Submission.findAllByTerm(term), model: [submissionCount: submissionService.count()]
            } else {
                respond Submission.findAllByTermAndUser(term, springSecurityService.getCurrentUser()), model: [submissionCount: submissionService.count()]
            }
        } else {
            if (!(springSecurityService.getCurrentUser() as User).isStudent()) {
                respond Submission.findAllByTermAndPage(term, page), model: [submissionCount: submissionService.count()]
            } else {
                respond Submission.findAllByTermAndUserAndPage(term, springSecurityService.getCurrentUser(), page), model: [submissionCount: submissionService.count()]
            }
        }
    }

    def show(Long id) {
        respond submissionService.get(id)
    }

    def complete(Submission submission) {

        // Now we have to validate the submission

        Optional<String> response = submission.verifyCompleteness();

        if (response.isPresent())
            respond message: response.get(), status: FORBIDDEN
        else
            respond submission, view: "show";
    }


    def addRecording() {

        QuestionResponse questionResponse = QuestionResponse.findByQuestionAndSubmission(Question.get(params.questionId), Submission.get(params.submissionId));

        if (!questionResponse) {
            questionResponse = new QuestionResponse();
            questionResponse.question = Question.get(params.questionId);
            questionResponse.submission = Submission.get(params.submissionId);
        }

        def response = AWSUploaderService.upload(params.audio_data, "audio");

        AudioProperty audio = new AudioProperty();
        audio.setAutoPlay(false)
        audio.setAwsKey(response.awsKey);
        audio.setAwsUrl(response.s3FileUrl);
        audio.save(flush: true);

        questionResponse.response = response.awsKey;

        questionResponse.save(failOnError: true, flush: true);

        respond questionResponse, [status: OK, view: "addRecording"]
    }


    def save(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }


        submission.term = Term.findByCurrent(true);
        submission.user = springSecurityService.getCurrentUser();
        submission.drafted = new Date();
        try {
            submissionService.save(submission)
        } catch (ValidationException e) {
            respond submission.errors, view: 'create'
            return
        }

        respond submission, [status: CREATED, view: "show"]
    }

    def update(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }

        try {
            submissionService.save(submission)
        } catch (ValidationException e) {
            respond submission.errors, view: 'edit'
            return
        }

        respond submission, [status: OK, view: "show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        submissionService.delete(id)

        render status: NO_CONTENT
    }
}
