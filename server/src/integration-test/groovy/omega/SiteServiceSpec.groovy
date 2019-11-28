package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SiteServiceSpec extends Specification {

    SiteService siteService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Site(...).save(flush: true, failOnError: true)
        //new Site(...).save(flush: true, failOnError: true)
        //Site site = new Site(...).save(flush: true, failOnError: true)
        //new Site(...).save(flush: true, failOnError: true)
        //new Site(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //site.id
    }

    void "test get"() {
        setupData()

        expect:
        siteService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Site> siteList = siteService.list(max: 2, offset: 2)

        then:
        siteList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        siteService.count() == 5
    }

    void "test delete"() {
        Long siteId = setupData()

        expect:
        siteService.count() == 5

        when:
        siteService.delete(siteId)
        sessionFactory.currentSession.flush()

        then:
        siteService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Site site = new Site()
        siteService.save(site)

        then:
        site.id != null
    }
}
