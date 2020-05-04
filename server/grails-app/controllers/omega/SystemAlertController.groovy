package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class SystemAlertController {

    SystemAlertService systemAlertService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        def alerts =  systemAlertService.list(params);
        if(params.now)
        {
            Date now = new Date();
            alerts = SystemAlert.list().findAll {
                return it.alert_start.before(now) && it.alert_end.after(now);
            };
        }


        respond alerts, model:[alertCount: systemAlertService.count()]
    }

    def show(Long id) {
        respond systemAlertService.get(id)
    }

    def save(SystemAlert alert) {
        if (alert == null) {
            render status: NOT_FOUND
            return
        }

        try {
            systemAlertService.save(alert)
        } catch (ValidationException e) {
            respond alert.errors, view:'create'
            return
        }

        respond alert, [status: CREATED, view:"show"]
    }

    def update(SystemAlert alert) {
        if (alert == null) {
            render status: NOT_FOUND
            return
        }

        try {
            systemAlertService.save(alert)
        } catch (ValidationException e) {
            respond alert.errors, view:'edit'
            return
        }

        respond alert, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        systemAlertService.delete(id)

        render status: NO_CONTENT
    }
}
