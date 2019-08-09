package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*


@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACUTLY','ROLE_GRADER','ROLE_STUDENT'])
class SubmissionController {

    SubmissionService submissionService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond submissionService.list(params), model:[submissionCount: submissionService.count()]
    }

    def show(Long id) {
        respond submissionService.get(id)
    }

    def save(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }

        try {
            submissionService.save(submission)
        } catch (ValidationException e) {
            respond submission.errors, view:'create'
            return
        }

        respond submission, [status: CREATED, view:"show"]
    }

    def update(Submission submission) {
        if (submission == null) {
            render status: NOT_FOUND
            return
        }

        try {
            submissionService.save(submission)
        } catch (ValidationException e) {
            respond submission.errors, view:'edit'
            return
        }

        respond submission, [status: OK, view:"show"]
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
