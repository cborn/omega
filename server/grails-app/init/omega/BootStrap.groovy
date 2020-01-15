package omega

import grails.converters.JSON
import grails.util.Environment

class BootStrap {

    def init = { servletContext ->

        if (Environment.current == Environment.DEVELOPMENT) {
            // insert Development environment specific code here


            Site carletonSite = new Site(name: "Carleton College",awsAccessKey: System.getenv("LL_AWS_ACCESS_KEY_ID"),awsSecretKey: System.getenv("LL_AWS_SECRET_KEY"),awsBucketName: System.getenv("LL_AWS_BUCKET_NAME"),awsBucketRegion: System.getenv("LL_AWS_BUCKET_REGION"),moodleKey: "my-secret",moodleUrl: "https://moodle-staging.its.carleton.edu/").save(failOnError:true, flush:true);

            Role superAdminRole = new Role(authority: "ROLE_SUPER_ADMIN").save(flush: true);
            Role admin = new Role(authority: "ROLE_ADMIN").save(flush: true);
            Role faculty = new Role(authority: "ROLE_FACULTY").save(flush: true);
            Role grader = new Role(authority: "ROLE_GRADER").save(flush: true);
            Role student = new Role(authority: "ROLE_STUDENT").save(flush: true);

            def testUser = new User(username: 'superAdmin', password: 'test', firstname: "Administrator", surname: "User").save(failOnError: true)
            def adminUser = new User(username: 'admin', password: 'test', firstname: "Administrator", surname: "User",site: carletonSite).save(failOnError: true)
            def studentUser = new User(username: 'student', password: 'test', firstname: "Student", surname: "User",site: carletonSite).save(failOnError: true)
            def facultyUser = new User(username: 'faculty', password: 'test', firstname: "Faculty", surname: "User",site: carletonSite).save(failOnError: true)
            def graderUser = new User(username: 'grader', password: 'test', firstname: "Grader", surname: "User",site: carletonSite).save(failOnError: true)
            def FacultyGraderUser = new User(username: 'facultyGrader', password: 'test', firstname: "Faculty Grader", surname: "User",site: carletonSite).save(failOnError: true)


            UserRole.create testUser, superAdminRole
            UserRole.create adminUser, admin

            UserRole.create studentUser, student
            UserRole.create facultyUser, faculty
            UserRole.create graderUser, grader
            UserRole.create FacultyGraderUser, faculty
            UserRole.create FacultyGraderUser, grader


            UserRole.withSession {
                it.flush()
                it.clear()
            }

            assert User.count() == 6
            assert Role.count() == 5
            assert UserRole.count() == 7

            // Create some demo content in here.


            Term t1 = new Term(name: "Term 1", current: true,site: carletonSite).save(failOnError: true, flush: true);
            Term t2 = new Term(name: "Next Term",site: carletonSite).save(flush: true);

            Course c = new Course();
            c.setName("Welsh for beginners");
            c.setMoodle_master_id("1")

            Lesson l = new Lesson();
            l.setName("1. Vowels");

            LessonPage page = new LessonPage();

            page.setName("(A, E, I)")
            page.setStatus(LessonPageStatus.PUBLISHED)
            page.setDueDate(new Date());

            c.setTerm(t1);
            c.save([failOnError: true, flush: true])

            l.setCourse(c);
            l.save([failOnError: true, flush: true]);
            c.addToLessons(l);
            c.save([failOnError: true, flush: true])

            page.setLesson(l);
            page.setPageOrder(0);
            page.save([failOnError: true, flush: true]);

            l.addToPages(page);
            l.save([failOnError: true, flush: true]);


            println "Initialising Boot scripts"
            Question q = new Question();

            q.setName("Is R a Vowel?")
            q.setPosition(0)
            q.setType(QuestionType.BOOLEAN);
            q.setMax_grade(1);
            q.setPage(page);



            q.save([failOnError: true, flush: true])
            page.addToQuestions(q);


            def q2 = new Question();

            q2.setName("Fill in the blanks from the song 'Sosban Fach'?")
            q2.setPosition(1);
            q2.setType(QuestionType.CLOZE);
            q2.setMax_grade(4);
            q2.setPage(page);

            Map customProperties = new HashMap<String, ? extends Object>();
            customProperties.put(Question.QuestionPropertyKeys.CLOZE_TEXT.key_name, "Mae bys Meri Ann wedi @@, A Dafydd y gwas ddim yn iach. Mae'r baban yn y crud yn @@, A'r gath wedi sgrapo @@.");
            customProperties.put(Question.QuestionPropertyKeys.CLOZE_PROMPTS.key_name, ([[], ["Chwerthin", "Crio", "Tagu"], []] as JSON) as String);
            q2.setCustom_properties(customProperties)

            q2.save([failOnError: true, flush: true])


            def q3 = new Question();

            q3.setName("Whats something out of this list.")
            q3.setPosition(2);
            q3.setType(QuestionType.MULTI_CHOICE);
            q3.setMax_grade(4);
            q3.setPage(page);

            Map customProperties2 = new HashMap<String, ? extends Object>();
            customProperties2.put(Question.QuestionPropertyKeys.MULTI_CHOICE_OPTIONS.key_name, "Mae@@ond@@peth@@");
            q3.setCustom_properties(customProperties2)

            q3.save([failOnError: true, flush: true])



            def q4 = new Question();

            q4.setName("Sing Calon Lân.")
            q4.setPosition(3);
            q4.setType(QuestionType.VOICE);
            q4.setMax_grade(1);
            q4.setPage(page);

            q4.save([failOnError: true, flush: true])



            page.addToQuestions(q3);
            page.save([failOnError: true, flush: true])


            Submission sub = new Submission(user: studentUser, term: t1, page: page, drafted: new Date());
            sub.save(failOnError: true, flush: true);

            QuestionResponse q1Resp = new QuestionResponse(question: q, response: "true", submission: sub).save(failOnError: true, flush: true);
            QuestionResponse q2Resp = new QuestionResponse(question: q2, response: "Brifo@@Crio@@Joni bach", submission: sub).save(failOnError: true, flush: true);
            QuestionResponse q3Resp = new QuestionResponse(question: q3, response: "Mae", submission: sub).save(failOnError: true, flush: true);
        } else {
            // Not Development Channel
            // Enter production code here
            def superAdminRole = Role.findByAuthority('ROLE_SUPER_ADMIN')


            if(superAdminRole == null)
            {
                superAdminRole = new Role(authority: "ROLE_SUPER_ADMIN").save(flush: true);
                Role admin = new Role(authority: "ROLE_ADMIN").save(flush: true);
                Role faculty = new Role(authority: "ROLE_FACULTY").save(flush: true);
                Role grader = new Role(authority: "ROLE_GRADER").save(flush: true);
                Role student = new Role(authority: "ROLE_STUDENT").save(flush: true);
            }


            def adminUser = User.findByUsername('admin')

            if(adminUser == null)
            {
                adminUser = new User(username: 'admin', password: '12345', email: "admin@email.com").save(flush: true)

                UserRole.create adminUser, superAdminRole

                UserRole.withSession {
                    it.flush()
                    it.clear()
                }

            }



        }

    }
    def destroy = {
    }
}
