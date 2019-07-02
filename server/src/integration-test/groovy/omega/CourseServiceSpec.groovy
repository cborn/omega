package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class CourseServiceSpec extends Specification {

    CourseService courseService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Course(...).save(flush: true, failOnError: true)
        //new Course(...).save(flush: true, failOnError: true)
        //Course course = new Course(...).save(flush: true, failOnError: true)
        //new Course(...).save(flush: true, failOnError: true)
        //new Course(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //course.id
    }

    void "test get"() {
        setupData()

        expect:
        courseService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Course> courseList = courseService.list(max: 2, offset: 2)

        then:
        courseList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        courseService.count() == 5
    }

    void "test delete"() {
        Long courseId = setupData()

        expect:
        courseService.count() == 5

        when:
        courseService.delete(courseId)
        sessionFactory.currentSession.flush()

        then:
        courseService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Course course = new Course()
        courseService.save(course)

        then:
        course.id != null
    }
}
