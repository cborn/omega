package omega

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class QuestionController {

    QuestionService questionService
    QuestionImageUploaderService questionImageUploaderService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond questionService.list(params), model:[questionCount: questionService.count()]
    }

    def show(Long id) {
        respond questionService.get(id)
    }

    def removeImage() {

        println(params);

        def question = Question.get(params.id);

        if (question == null) {
            render status: NOT_FOUND
            return
        }

        questionImageUploaderService.removeImage(params.image);

        ImageProperty p = ImageProperty.findByAwsKey(params.image);

        p.delete(flush:true);


        String images = question.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name);

        if(images != null) {
            if(images.contains("@@")) {
                def imagesArray = images.split("@@").toList();

                imagesArray.remove(p.awsKey);

                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, imagesArray.join("@@"));
            } else {
                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, images.replace(p.awsKey,""));
            }
        }


        question.save(flush:true);

        respond question, [status: OK, view:"show"]

    }

    def addImage(){

        def question = Question.get(params.id);

        if (question == null) {
            render status: NOT_FOUND
            return
        }


        def response = questionImageUploaderService.uploadFeatureImage(params.image);


        ImageProperty im = new ImageProperty();
        im.setAutoPlay(false)
        im.setAwsKey(response.awsKey);
        im.setAwsUrl(response.s3FileUrl);
        im.save(flush:true);


        String images = question.custom_properties.get(Question.QuestionPropertyKeys.IMAGES.key_name);

        if(images != null && images.length() > 0) {
            if(images.contains("@@")) {
                def imagesArray = images.split("@@").toList();

                imagesArray.add(im.awsKey.toString());

                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, imagesArray.join("@@"));
            } else {
                question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, (images + "@@" +im.awsKey));
            }
        }
        else {
            question.custom_properties.put(Question.QuestionPropertyKeys.IMAGES.key_name, im.awsKey.toString());
        }
        question.save(flush:true);

        respond question, [status: OK, view:"show"]


    }

    def save(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view:'create'
            return
        }

        respond question, [status: CREATED, view:"show"]
    }

    def update(Question question) {
        if (question == null) {
            render status: NOT_FOUND
            return
        }

        try {
            questionService.save(question)
        } catch (ValidationException e) {
            respond question.errors, view:'edit'
            return
        }

        respond question, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        questionService.delete(id)

        render status: NO_CONTENT
    }
}
