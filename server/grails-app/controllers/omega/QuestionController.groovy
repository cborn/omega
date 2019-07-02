package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class QuestionController {

    QuestionService questionService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond questionService.list(params), model:[questionCount: questionService.count()]
    }

    def show(Long id) {
        respond questionService.get(id)
    }

    def save(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view:'create'
            return
        }

        respond question, [status: CREATED, view:"show"]
    }

    def update(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view:'edit'
            return
        }

        respond question, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        questionService.delete(id)

        render status: NO_CONTENT
    }
}
