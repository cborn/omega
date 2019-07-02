package omega

import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->

        // Create some demo content in here.

        Course c = new Course();
        c.setName("Welsh for beginners");
        c.setMoodle_master_id("1")




        Lesson l = new Lesson();
        l.setName("1. Vowels");

        LessonPage page = new LessonPage();

        page.setName("(A, E, I)")
        page.setDueDate(new Date());

        c.save([failOnError:true,flush:true])


        l.setCourse(c);
        l.save([failOnError:true,flush:true]);
        c.addToLessons(l);
        c.save([failOnError:true,flush:true])

        page.setLesson(l);
        page.save([failOnError:true,flush:true]);

        l.addToPages(page);
        l.save([failOnError:true,flush:true]);



        Question q = new Question();

        q.setName("Is R a Vowel?")
        q.setType(QuestionType.BOOLEAN);
        q.setMax_grade(1);
        q.setPage(page);



        q.save([failOnError:true,flush:true])
        page.addToQuestions(q);


        def q2 = new Question();

        q2.setName("Fill in the blanks from the song 'Sosban Fach'?")
        q2.setType(QuestionType.CLOZE);
        q2.setMax_grade(4);
        q2.setPage(page);

        Map customProperties = new HashMap<String, ? extends Object>();
        customProperties.put(Question.QuestionPropertyKeys.CLOZE_TEXT.key_name,"Mae bys Meri Ann wedi @@, A Dafydd y gwas ddim yn iach. Mae'r baban yn y crud yn @@, A'r gath wedi sgrapo @@.");
        customProperties.put(Question.QuestionPropertyKeys.CLOZE_PROMPTS.key_name, ([[], ["Chwerthin", "Crio", "Tagu"], []] as JSON) as String);
        q2.setCustom_properties(customProperties)

        q2.save([failOnError:true,flush:true])
        page.addToQuestions(q2);
        page.save([failOnError:true,flush:true])












    }
    def destroy = {
    }
}
