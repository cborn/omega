package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import org.springframework.dao.DataIntegrityViolationException

import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class LessonController {

    LessonService lessonService
    def springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]


    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        Course course = Course.get(params.courseId);
        respond Lesson.findAllByCourse(course), model:[lessonCount: lessonService.count()]
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

        try {
            lessonService.delete(id)
        } catch (DataIntegrityViolationException e) {
            respond e.message, status: NOT_MODIFIED, view:'delete'
            return
        }

        render status: NO_CONTENT
    }
}
