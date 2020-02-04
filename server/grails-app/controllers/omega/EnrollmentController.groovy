package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_FACULTY', 'ROLE_GRADER'])
class EnrollmentController {

    EnrollmentService enrollmentService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", grades: "GET"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond enrollmentService.list(params), model:[enrollmentCount: enrollmentService.count()]
    }

    def show(Long id) {
        respond enrollmentService.get(id)
    }


    def grades() {

        def enrollment = Enrollment.findAllByTermAndLesson(Term.get(params.term),Lesson.get(params.id))

        respond enrollment

    }

    def save() {

        Lesson lesson = Lesson.get(request.JSON.lesson)

        if(!lesson) {
            ErrorMessage message = new ErrorMessage()
            message.message = "Lesson not found"
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
            return
        }

        Term term = Term.get(request.JSON.term)

        if(!term) {
            ErrorMessage message = new ErrorMessage()
            message.message = "Term not found"
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
            return
        }

        User user = User.get(request.JSON.user)

        if(!user) {
            ErrorMessage message = new ErrorMessage()
            message.message = "User not found"
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
            return
        }

        if(request.JSON.grade == null) {
            ErrorMessage message = new ErrorMessage()
            message.message = "Grade cannot be empty"
            message.error = 403
            response.status = 403
            respond message: message, [status: FORBIDDEN, message: message.message]
            return
        }



        Enrollment enrollment = Enrollment.findByTermAndUserAndLesson(term,user,lesson)


        if (enrollment == null) {
            enrollment = new Enrollment(term: term,user: user,lesson: lesson,grade: request.JSON.grade)
        }
        else {
            enrollment.grade = request.JSON.grade
        }

        try {
            enrollmentService.save(enrollment)
        } catch (ValidationException e) {
            respond enrollment.errors, view:'create'
            return
        }

        // Once saved we need to fire the grade back to moodle....




        respond enrollment, [status: CREATED, view:"show"]
    }

    def update(Enrollment enrollment) {
        if (enrollment == null) {
            render status: NOT_FOUND
            return
        }

        try {
            enrollmentService.save(enrollment)
        } catch (ValidationException e) {
            respond enrollment.errors, view:'edit'
            return
        }

        respond enrollment, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        enrollmentService.delete(id)

        render status: NO_CONTENT
    }
}
