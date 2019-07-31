package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class PropertyController {

    PropertyService propertyService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond propertyService.list(params), model:[propertyCount: propertyService.count()]
    }

    def show(Long id) {
        respond propertyService.get(id)
    }

    def save(Property property) {
        if (property == null) {
            render status: NOT_FOUND
            return
        }

        try {
            propertyService.save(property)
        } catch (ValidationException e) {
            respond property.errors, view:'create'
            return
        }

        respond property, [status: CREATED, view:"show"]
    }

    def update(Property property) {
        if (property == null) {
            render status: NOT_FOUND
            return
        }

        try {
            propertyService.save(property)
        } catch (ValidationException e) {
            respond property.errors, view:'edit'
            return
        }

        respond property, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        propertyService.delete(id)

        render status: NO_CONTENT
    }
}
