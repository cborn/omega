package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SystemSystemAlertServiceSpec extends Specification {

    SystemAlertService alertService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Alert(...).save(flush: true, failOnError: true)
        //new Alert(...).save(flush: true, failOnError: true)
        //Alert alert = new Alert(...).save(flush: true, failOnError: true)
        //new Alert(...).save(flush: true, failOnError: true)
        //new Alert(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //alert.id
    }

    void "test get"() {
        setupData()

        expect:
        alertService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<SystemAlert> alertList = alertService.list(max: 2, offset: 2)

        then:
        alertList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        alertService.count() == 5
    }

    void "test delete"() {
        Long alertId = setupData()

        expect:
        alertService.count() == 5

        when:
        alertService.delete(alertId)
        sessionFactory.currentSession.flush()

        then:
        alertService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        SystemAlert alert = new SystemAlert()
        alertService.save(alert)

        then:
        alert.id != null
    }
}
