package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ImagePropertyController {

    ImagePropertyService imagePropertyService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond imagePropertyService.list(params), model:[imagePropertyCount: imagePropertyService.count()]
    }

    def show(Long id) {
        respond imagePropertyService.get(id)
    }

    def save(ImageProperty imageProperty) {
        if (imageProperty == null) {
            render status: NOT_FOUND
            return
        }

        try {
            imagePropertyService.save(imageProperty)
        } catch (ValidationException e) {
            respond imageProperty.errors, view:'create'
            return
        }

        respond imageProperty, [status: CREATED, view:"show"]
    }

    def update(ImageProperty imageProperty) {
        if (imageProperty == null) {
            render status: NOT_FOUND
            return
        }

        try {
            imagePropertyService.save(imageProperty)
        } catch (ValidationException e) {
            respond imageProperty.errors, view:'edit'
            return
        }

        respond imageProperty, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        imagePropertyService.delete(id)

        render status: NO_CONTENT
    }
}
