package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class QuestionResponseServiceSpec extends Specification {

    QuestionResponseService questionResponseService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new QuestionResponse(...).save(flush: true, failOnError: true)
        //new QuestionResponse(...).save(flush: true, failOnError: true)
        //QuestionResponse questionResponse = new QuestionResponse(...).save(flush: true, failOnError: true)
        //new QuestionResponse(...).save(flush: true, failOnError: true)
        //new QuestionResponse(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //questionResponse.id
    }

    void "test get"() {
        setupData()

        expect:
        questionResponseService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<QuestionResponse> questionResponseList = questionResponseService.list(max: 2, offset: 2)

        then:
        questionResponseList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        questionResponseService.count() == 5
    }

    void "test delete"() {
        Long questionResponseId = setupData()

        expect:
        questionResponseService.count() == 5

        when:
        questionResponseService.delete(questionResponseId)
        sessionFactory.currentSession.flush()

        then:
        questionResponseService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        QuestionResponse questionResponse = new QuestionResponse()
        questionResponseService.save(questionResponse)

        then:
        questionResponse.id != null
    }
}
