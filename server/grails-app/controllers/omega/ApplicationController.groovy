package omega

import grails.core.GrailsApplication
import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.*

import static org.springframework.http.HttpStatus.NOT_FOUND

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager
    SpringSecurityService springSecurityService

    def index() {
        User user = springSecurityService.currentUser as User
        if(user == null){
            render status: 401
        }
        def siteId = request.getHeader('x-admin-site')
        Site site = user.site ? user.site : Site.get(siteId)

        User currentUser = springSecurityService.getCurrentUser() as User
        Term currentTerm = Term.findByCurrentAndSite(true,site)

        String bucket = site?.awsBucketName
        String region = site?.awsBucketRegion

        if(!bucket)
            bucket = "omegadev"

        if(!region)
            region = "eu-central-1"





        [term:currentTerm,user:currentUser ,terms:Term.findAllBySite(site) ,site: site,isSuperAdmin: currentUser != null && currentUser.isSuperAdmin(),isStudent: currentUser != null && currentUser.isStudent(),isAdminOrSuperAdmin: currentUser != null && currentUser.isAdminOrSuperAdmin(),bucket: bucket, region:region]
    }
}

