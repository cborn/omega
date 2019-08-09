package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SubmissionServiceSpec extends Specification {

    SubmissionService submissionService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Submission(...).save(flush: true, failOnError: true)
        //new Submission(...).save(flush: true, failOnError: true)
        //Submission submission = new Submission(...).save(flush: true, failOnError: true)
        //new Submission(...).save(flush: true, failOnError: true)
        //new Submission(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //submission.id
    }

    void "test get"() {
        setupData()

        expect:
        submissionService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Submission> submissionList = submissionService.list(max: 2, offset: 2)

        then:
        submissionList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        submissionService.count() == 5
    }

    void "test delete"() {
        Long submissionId = setupData()

        expect:
        submissionService.count() == 5

        when:
        submissionService.delete(submissionId)
        sessionFactory.currentSession.flush()

        then:
        submissionService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Submission submission = new Submission()
        submissionService.save(submission)

        then:
        submission.id != null
    }
}
