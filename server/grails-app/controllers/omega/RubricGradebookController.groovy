package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*


@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN'])
class RubricGradebookController {

    RubricGradebookService rubricGradebookService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond rubricGradebookService.list(params), model:[rubricGradebookCount: rubricGradebookService.count()]
    }

    def show(Long id) {
        respond rubricGradebookService.get(id)
    }

    def save(RubricGradebook rubricGradebook) {
        if (rubricGradebook == null) {
            render status: NOT_FOUND
            return
        }

        try {
            rubricGradebookService.save(rubricGradebook)
        } catch (ValidationException e) {
            respond rubricGradebook.errors, view:'create'
            return
        }

        respond rubricGradebook, [status: CREATED, view:"show"]
    }

    def update(RubricGradebook rubricGradebook) {
        if (rubricGradebook == null) {
            render status: NOT_FOUND
            return
        }

        try {
            rubricGradebookService.save(rubricGradebook)
        } catch (ValidationException e) {
            respond rubricGradebook.errors, view:'edit'
            return
        }

        respond rubricGradebook, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        rubricGradebookService.delete(id)

        render status: NO_CONTENT
    }
}
