package omega

import grails.gorm.services.Service

@Service(Course)
interface CourseService {

    Course get(Serializable id)

    List<Course> list(Map args)

    Long count()

    void delete(Serializable id)

    Course save(Course course)

}