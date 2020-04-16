package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*


@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class CourseController {

    transient springSecurityService
    CourseService courseService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def term = Term.get(params.term)

        if(term == null) {
            render status: NOT_FOUND
            return
        }
        User user = springSecurityService.currentUser as User;

        if(user.isAdminOrSuperAdmin()) {
            respond Course.findAllByTerm(term), model:[courseCount: courseService.count()]
        }
        else if(!user.isStudent()){
            def courses = Course.findAllByTerm(term).findAll({ it.owners.contains(user)});
            respond courses, model: [courseCount: courses.size()]
        }
        else {
            // This is a student so we need to check enrollment before we show this course to the user.
            def rawCourses = Course.findAllByTerm(term);


            List<Course> courses = new ArrayList<Course>();

            rawCourses*.lessons*.forEach({
                if(Enrollment.findByLessonAndUserAndTerm(it,user,term)) {
                    // there is an enrollment so we can add this course.
                    courses.push(it.course);
                }
            })

            respond courses.unique(), model: [courseCount: courses.size()]
        }

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
            course.addToOwners(springSecurityService.currentUser as User);
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
