package omega

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import jdk.nashorn.internal.runtime.regexp.joni.exception.ErrorMessages

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
        Term term = Term.findByCurrent(true)

        if (params.term != null) {
            term = Term.get(params.term)
        }

        LessonPage page = LessonPage.get(params.lessonPageId)

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

    def complete(Submission sub) {


        Submission submission = Submission.get(sub.id)

        // Now we have to validate the submission
        Optional<String> validationResponse = submission.verifyCompleteness()

        if (validationResponse.isPresent()) {
            ErrorMessage message = new ErrorMessage()
            message.message = validationResponse.get()
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
        }
        else
        {
            submission.setStatus(SubmissionStatus.SUBMITTED)
            submission.submitted = new Date()
            submission.save(flush:true)
            respond submission, view: "show"
        }

    }


    def addRecording() {

        QuestionResponse questionResponse = QuestionResponse.findByQuestionAndSubmission(Question.get(params.questionId), Submission.get(params.submissionId))

        Site site;
        if(!questionResponse)
        {
            site = Question.get(params.questionId).page.lesson.course.term.site;
        }
        else {
            site = questionResponse.question.page.lesson.course.term.site
        };

        def response = AWSUploaderService.upload(params.audio_data, "audio",site)


        AudioProperty audio = new AudioProperty()
        audio.setAutoPlay(false)
        audio.setAwsKey(response.awsKey)
        audio.setAwsUrl(response.s3FileUrl)
        audio.setSite(site);
        audio.save(flush:true,failOnError:true)


        QuestionResponse.withNewTransaction {

            if (!questionResponse) {
                questionResponse = new QuestionResponse(question: Question.get(params.questionId),submission: Submission.get(params.submissionId))

            }
            else {
                questionResponse.attach()
            }

            if (questionResponse.status == QuestionStatus.COMMENTS_PENDING) {
                questionResponse.setStatus(QuestionStatus.COMMENTS_RESPONDED)
            }

            questionResponse.response = response.awsKey

            questionResponse.save(failOnError: true, flush: true)
        }


        respond questionResponse, [status: OK, view: "addRecording"]
    }


    def seen() {

        Submission submission = Submission.get(params.id)

        // Mark the response statuses as 'seen'

        submission.responses.each {
            if (it.status == QuestionStatus.AWAITING_REVIEW) {
                it.status = QuestionStatus.SEEN
                it.save(flush: true)
            }
        }

        submission.save(flush: true)

        respond submission, [status: OK, view: "show"]
    }


    def grade(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }
        submission.graded = new Date()
        submission.status = SubmissionStatus.GRADED

        if (submission.grade == null) {
            ErrorMessage message = new ErrorMessage()
            message.message = "Grade cannot be empty"
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
            return
        }

        try {
            submissionService.save(submission)
        } catch (ValidationException e) {
            respond submission.errors, view: 'create'
            return
        }

        respond submission, [status: CREATED, view: "show"]
    }


    def save(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }


        submission.term = Term.findByCurrent(true)
        submission.user = springSecurityService.getCurrentUser()
        submission.drafted = new Date()
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
