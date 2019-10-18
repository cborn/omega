package omega

import grails.core.GrailsApplication
import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager
    SpringSecurityService springSecurityService;

    def index() {

        Term currentTerm = Term.findByCurrent(true);
        User currentUser = springSecurityService.getCurrentUser() as User;
        [term:currentTerm,user:currentUser ,terms:Term.list() ,isStudent: currentUser != null && currentUser.isStudent(),isAdminOrSuperAdmin: currentUser != null && currentUser.isAdminOrSuperAdmin()]
    }
}

