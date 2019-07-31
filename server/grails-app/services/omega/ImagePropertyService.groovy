package omega

import grails.gorm.services.Service

@Service(ImageProperty)
interface ImagePropertyService {

    ImageProperty get(Serializable id)

    List<ImageProperty> list(Map args)

    Long count()

    void delete(Serializable id)

    ImageProperty save(ImageProperty imageProperty)

}