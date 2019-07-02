package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class CourseController {

    CourseService courseService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond courseService.list(params), model:[courseCount: courseService.count()]
    }

    def show(Long id) {
        respond courseService.get(id)
    }

    def save(Course course) {
        if (course == null) {
            render status: NOT_FOUND
            return
        }

        try {
            courseService.save(course)
        } catch (ValidationException e) {
            respond course.errors, view:'create'
            return
        }

        respond course, [status: CREATED, view:"show"]
    }

    def update(Course course) {
        if (course == null) {
            render status: NOT_FOUND
            return
        }

        try {
            courseService.save(course)
        } catch (ValidationException e) {
            respond course.errors, view:'edit'
            return
        }

        respond course, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        courseService.delete(id)

        render status: NO_CONTENT
    }
}
