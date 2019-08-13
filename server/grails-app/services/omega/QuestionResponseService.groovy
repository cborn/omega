package omega

import grails.gorm.services.Service

@Service(QuestionResponse)
interface QuestionResponseService {

    QuestionResponse get(Serializable id)

    List<QuestionResponse> list(Map args)

    Long count()

    void delete(Serializable id)

    QuestionResponse save(QuestionResponse questionResponse)

}