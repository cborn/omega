package omega

import grails.gorm.services.Service

@Service(Enrollment)
interface EnrollmentService {

    Enrollment get(Serializable id)

    List<Enrollment> list(Map args)

    Long count()

    void delete(Serializable id)

    Enrollment save(Enrollment enrollment)

}