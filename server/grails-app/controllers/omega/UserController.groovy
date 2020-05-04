package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import java.util.stream.Collectors

import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER'])
class UserController {

    UserService userService
    def springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
            params.max = Math.min(max ?: 10, 100)

            User user = springSecurityService.currentUser as User
            if(user) {
                def siteId = request.getHeader('x-admin-site')
                Site site = user.site ? user.site : Site.get(siteId)

                if (params.student) {
                    respond UserRole.findAllByRole(Role.getStudentRole())*.user.findAll {
                        it.site.id == site.id
                    }, model: [userCount: userService.count()]
                } else {
                    respond User.findAllBySite(site), model: [userCount: userService.count()]
                }

            }
            else {
                println("User check failed")
                respond status: 401;
            }
    }

    def show(Long id) {
        respond userService.get(id)
    }

    def saveAsSuperAdmin(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            userService.save(user)

            UserRole.create user, Role.getSuperAdminRole()
            UserRole.withSession {
                it.flush()
                it.clear()
            }
        } catch (ValidationException e) {
            respond user.errors, view:'create'
            return
        }

        respond user, [status: CREATED, view:"show"]
    }

    def save() {

        User u = springSecurityService.currentUser as User
        def role = Role.findByAuthority(request.JSON.role);

        def user = request.getJSON() as User;

        if (user == null || role == null ) {
            render status: NOT_FOUND
            return
        }
        def siteId = request.getHeader('x-admin-site')
        Site site = u.site ? u.site : Site.get(siteId)

        user.site = site;

        try {
            userService.save(user)

            UserRole.create user, role;

            UserRole.withSession {
                it.flush()
                it.clear()
            }

        } catch (ValidationException e) {
            respond user.errors, view:'create'
            return
        }

        respond user, [status: CREATED, view:"show"]
    }

    def update(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            userService.save(user)
        } catch (ValidationException e) {
            respond user.errors, view:'edit'
            return
        }

        respond user, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        def user = User.get(id);
        UserRole.removeAll(user)
        Enrollment.where { user == user }.deleteAll();
        def submissions = Submission.findAllByUser(user);

        submissions.each { s ->
           QuestionResponse.where {submission == s}.deleteAll()
        }

        submissions*.delete();



        userService.delete(id)

        render status: NO_CONTENT
    }
}