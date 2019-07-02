package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class LessonServiceSpec extends Specification {

    LessonService lessonService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Lesson(...).save(flush: true, failOnError: true)
        //new Lesson(...).save(flush: true, failOnError: true)
        //Lesson lesson = new Lesson(...).save(flush: true, failOnError: true)
        //new Lesson(...).save(flush: true, failOnError: true)
        //new Lesson(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //lesson.id
    }

    void "test get"() {
        setupData()

        expect:
        lessonService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Lesson> lessonList = lessonService.list(max: 2, offset: 2)

        then:
        lessonList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        lessonService.count() == 5
    }

    void "test delete"() {
        Long lessonId = setupData()

        expect:
        lessonService.count() == 5

        when:
        lessonService.delete(lessonId)
        sessionFactory.currentSession.flush()

        then:
        lessonService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Lesson lesson = new Lesson()
        lessonService.save(lesson)

        then:
        lesson.id != null
    }
}
