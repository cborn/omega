package omega

import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class TermController {

    TermService termService
    SpringSecurityService springSecurityService;

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        User user = springSecurityService.currentUser as User;
        def siteId = request.getHeader('x-admin-site');
        Site site = user.site ? user.site : Site.get(siteId);

        if(site == null)
        {
            render status: NOT_FOUND
            return
        }

        respond Term.findAllBySite(site), model:[termCount: termService.count()]
    }

    def show(Long id) {
        respond termService.get(id)
    }

    def save(Term term) {
        if (term == null) {
            render status: NOT_FOUND
            return
        }

        User user = springSecurityService.currentUser as User;
        def siteId = request.getHeader('x-admin-site');
        Site site = user.site ? user.site : Site.get(siteId);


        if(site == null) {
            render status: NOT_FOUND
            return
        }
        else {
            term.site = site

            if(Term.countBySite(site) == 0) {
                term.current = true;
            }
        }


        try {
            termService.save(term)
        } catch (ValidationException e) {
            respond term.errors, view:'create'
            return
        }

        respond term, [status: CREATED, view:"show"]
    }

    def update(Term term) {
        if (term == null) {
            render status: NOT_FOUND
            return
        }

        try {
            termService.save(term)
        } catch (ValidationException e) {
            respond term.errors, view:'edit'
            return
        }

        respond term, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        termService.delete(id)

        render status: NO_CONTENT
    }
}
