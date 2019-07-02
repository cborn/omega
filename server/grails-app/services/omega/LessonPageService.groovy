package omega

import grails.gorm.services.Service

@Service(LessonPage)
interface LessonPageService {

    LessonPage get(Serializable id)

    List<LessonPage> list(Map args)

    Long count()

    void delete(Serializable id)

    LessonPage save(LessonPage lessonPage)

}