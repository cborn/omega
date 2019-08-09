package omega

import grails.gorm.services.Service

@Service(Term)
interface TermService {

    Term get(Serializable id)

    List<Term> list(Map args)

    Long count()

    void delete(Serializable id)

    Term save(Term term)

}