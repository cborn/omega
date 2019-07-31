package omega

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PropertyServiceSpec extends Specification {

    PropertyService propertyService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Property(...).save(flush: true, failOnError: true)
        //new Property(...).save(flush: true, failOnError: true)
        //Property property = new Property(...).save(flush: true, failOnError: true)
        //new Property(...).save(flush: true, failOnError: true)
        //new Property(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //property.id
    }

    void "test get"() {
        setupData()

        expect:
        propertyService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Property> propertyList = propertyService.list(max: 2, offset: 2)

        then:
        propertyList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        propertyService.count() == 5
    }

    void "test delete"() {
        Long propertyId = setupData()

        expect:
        propertyService.count() == 5

        when:
        propertyService.delete(propertyId)
        sessionFactory.currentSession.flush()

        then:
        propertyService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Property property = new Property()
        propertyService.save(property)

        then:
        property.id != null
    }
}
