package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class TermServiceSpec extends Specification {

    TermService termService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Term(...).save(flush: true, failOnError: true)
        //new Term(...).save(flush: true, failOnError: true)
        //Term term = new Term(...).save(flush: true, failOnError: true)
        //new Term(...).save(flush: true, failOnError: true)
        //new Term(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //term.id
    }

    void "test get"() {
        setupData()

        expect:
        termService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Term> termList = termService.list(max: 2, offset: 2)

        then:
        termList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        termService.count() == 5
    }

    void "test delete"() {
        Long termId = setupData()

        expect:
        termService.count() == 5

        when:
        termService.delete(termId)
        sessionFactory.currentSession.flush()

        then:
        termService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Term term = new Term()
        termService.save(term)

        then:
        term.id != null
    }
}
