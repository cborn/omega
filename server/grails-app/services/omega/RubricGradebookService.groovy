package omega

import grails.gorm.services.Service

@Service(RubricGradebook)
interface RubricGradebookService {

    RubricGradebook get(Serializable id)

    List<RubricGradebook> list(Map args)

    Long count()

    void delete(Serializable id)

    RubricGradebook save(RubricGradebook rubricGradebook)

}