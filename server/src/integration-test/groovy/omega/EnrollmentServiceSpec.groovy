package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class EnrollmentServiceSpec extends Specification {

    EnrollmentService enrollmentService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Enrollment(...).save(flush: true, failOnError: true)
        //new Enrollment(...).save(flush: true, failOnError: true)
        //Enrollment enrollment = new Enrollment(...).save(flush: true, failOnError: true)
        //new Enrollment(...).save(flush: true, failOnError: true)
        //new Enrollment(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //enrollment.id
    }

    void "test get"() {
        setupData()

        expect:
        enrollmentService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Enrollment> enrollmentList = enrollmentService.list(max: 2, offset: 2)

        then:
        enrollmentList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        enrollmentService.count() == 5
    }

    void "test delete"() {
        Long enrollmentId = setupData()

        expect:
        enrollmentService.count() == 5

        when:
        enrollmentService.delete(enrollmentId)
        sessionFactory.currentSession.flush()

        then:
        enrollmentService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Enrollment enrollment = new Enrollment()
        enrollmentService.save(enrollment)

        then:
        enrollment.id != null
    }
}
