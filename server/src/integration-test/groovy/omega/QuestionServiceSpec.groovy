package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class QuestionServiceSpec extends Specification {

    QuestionService questionService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Question(...).save(flush: true, failOnError: true)
        //new Question(...).save(flush: true, failOnError: true)
        //Question question = new Question(...).save(flush: true, failOnError: true)
        //new Question(...).save(flush: true, failOnError: true)
        //new Question(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //question.id
    }

    void "test get"() {
        setupData()

        expect:
        questionService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Question> questionList = questionService.list(max: 2, offset: 2)

        then:
        questionList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        questionService.count() == 5
    }

    void "test delete"() {
        Long questionId = setupData()

        expect:
        questionService.count() == 5

        when:
        questionService.delete(questionId)
        sessionFactory.currentSession.flush()

        then:
        questionService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Question question = new Question()
        questionService.save(question)

        then:
        question.id != null
    }
}
