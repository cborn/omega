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

        User user = springSecurityService.currentUser as User;
        def siteId = request.getHeader('x-admin-site');
        Site site = user.site ? user.site : Site.get(siteId);

        if(params.student) {
            respond UserRole.findAllByRole(Role.getStudentRole())*.user.findAll {it.site.id == site.id}, model:[userCount: userService.count()]
        }
        else
        {
            respond User.findAllBySite(site), model:[userCount: userService.count()]
        }


    }

    def show(Long id) {
        respond userService.get(id)
    }

    def save(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }

        try {
            userService.save(user)
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

        userService.delete(id)

        render status: NO_CONTENT
    }
}
