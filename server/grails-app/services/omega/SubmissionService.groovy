package omega

import grails.gorm.services.Service

@Service(Submission)
interface SubmissionService {

    Submission get(Serializable id)

    List<Submission> list(Map args)

    Long count()

    void delete(Serializable id)

    Submission save(Submission submission)

}