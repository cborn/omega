package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class LessonController {

    LessonService lessonService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond lessonService.list(params), model:[lessonCount: lessonService.count()]
    }

    def show(Long id) {
        respond lessonService.get(id)
    }

    def save(Lesson lesson) {
        if (lesson == null) {
            render status: NOT_FOUND
            return
        }

        try {
            lessonService.save(lesson)
        } catch (ValidationException e) {
            respond lesson.errors, view:'create'
            return
        }

        respond lesson, [status: CREATED, view:"show"]
    }

    def update(Lesson lesson) {
        if (lesson == null) {
            render status: NOT_FOUND
            return
        }

        try {
            lessonService.save(lesson)
        } catch (ValidationException e) {
            respond lesson.errors, view:'edit'
            return
        }

        respond lesson, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        lessonService.delete(id)

        render status: NO_CONTENT
    }
}
