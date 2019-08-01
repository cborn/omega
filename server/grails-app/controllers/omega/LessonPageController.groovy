package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class LessonPageController {

    LessonPageService lessonPageService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond lessonPageService.list(params), model:[lessonPageCount: lessonPageService.count()]
    }

    def show(Long id) {
        respond lessonPageService.get(id)
    }

    def save(LessonPage lessonPage) {
        if (lessonPage == null) {
            render status: NOT_FOUND
            return
        }

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

        try {
            lessonPageService.save(lessonPage)
        } catch (ValidationException e) {
            respond lessonPage.errors, view:'edit'
            return
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

}