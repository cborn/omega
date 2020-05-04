package omega

import grails.gorm.services.Service

@Service(SystemAlert)
interface SystemAlertService {

    SystemAlert get(Serializable id)

    List<SystemAlert> list(Map args)

    Long count()

    void delete(Serializable id)

    SystemAlert save(SystemAlert alert)

}