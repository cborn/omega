package omega

import grails.gorm.services.Service

@Service(Site)
interface SiteService {

    Site get(Serializable id)

    List<Site> list(Map args)

    Long count()

    void delete(Serializable id)

    Site save(Site site)

}