package omega

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER','ROLE_STUDENT'])
class LessonPageController {

    LessonPageService lessonPageService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        Lesson lesson = Lesson.get(params.lessonId);
        respond LessonPage.findAllByLesson(lesson).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]
    }


    def moveUp(Long id) {
        LessonPage lp = LessonPage.get(id);
        Lesson l = lp.lesson;
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder + 1,l);

        lp.pageOrder++;
        lp2.pageOrder--;


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]

    }


    def moveDown(Long id) {
        LessonPage lp = LessonPage.get(id);
        Lesson l = lp.lesson;
        LessonPage lp2 = LessonPage.findByPageOrderAndLesson(lp.pageOrder - 1,l);


        lp.pageOrder--;
        lp2.pageOrder++;


        lp.save()
        lp2.save()

        LessonPage.withSession {
            it.flush()
            it.clear()
        }

        respond LessonPage.findAllByLesson(l).sort {it.pageOrder}, model:[lessonPageCount: lessonPageService.count()]

    }


    def show(Long id) {
        respond lessonPageService.get(id)
    }

    def save(LessonPage lessonPage) {
        if (lessonPage == null) {
            render status: NOT_FOUND
            return
        }

        lessonPage.pageOrder = lessonPage.lesson.pages.size();

        try {
            lessonPageService.save(lessonPage)
        } catch (ValidationException e) {
            respond lessonPage.errors, view:'create'
            return
        }

        respond lessonPage, [status: CREATED, view:"show"]
    }


    def update(LessonPage lessonPage) {
        if (lessonPage == null) {
            render status: NOT_FOUND
            return
        }

        LessonPage.withNewTransaction {
            lessonPage.attach();


            try {
                lessonPageService.save(lessonPage)
            } catch (ValidationException e) {
                respond lessonPage.errors, view:'edit'
                return
            }


        }

        respond lessonPage, [status: OK, view:"show"]
    }

    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        lessonPageService.delete(id)

        render status: NO_CONTENT
    }

}
