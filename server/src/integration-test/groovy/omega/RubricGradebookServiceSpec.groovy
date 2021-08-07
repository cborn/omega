package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class RubricGradebookServiceSpec extends Specification {

    RubricGradebookService rubricGradebookService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new RubricGradebook(...).save(flush: true, failOnError: true)
        //new RubricGradebook(...).save(flush: true, failOnError: true)
        //RubricGradebook rubricGradebook = new RubricGradebook(...).save(flush: true, failOnError: true)
        //new RubricGradebook(...).save(flush: true, failOnError: true)
        //new RubricGradebook(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //rubricGradebook.id
    }

    void "test get"() {
        setupData()

        expect:
        rubricGradebookService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<RubricGradebook> rubricGradebookList = rubricGradebookService.list(max: 2, offset: 2)

        then:
        rubricGradebookList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        rubricGradebookService.count() == 5
    }

    void "test delete"() {
        Long rubricGradebookId = setupData()

        expect:
        rubricGradebookService.count() == 5

        when:
        rubricGradebookService.delete(rubricGradebookId)
        sessionFactory.currentSession.flush()

        then:
        rubricGradebookService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        RubricGradebook rubricGradebook = new RubricGradebook()
        rubricGradebookService.save(rubricGradebook)

        then:
        rubricGradebook.id != null
    }
}
