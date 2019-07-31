package omega

import grails.gorm.services.Service

@Service(Property)
interface PropertyService {

    Property get(Serializable id)

    List<Property> list(Map args)

    Long count()

    void delete(Serializable id)

    Property save(Property property)

}