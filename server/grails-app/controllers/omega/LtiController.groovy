package omega

import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.generation.TokenGenerator
import grails.plugin.springsecurity.rest.token.rendering.AccessTokenJsonRenderer
import grails.plugin.springsecurity.rest.token.storage.TokenStorageService
import grails.plugins.GrailsPluginManager
import grails.plugins.PluginManagerAware
import grails.transaction.Transactional
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.bind.annotation.RestController

class LtiController {


    static responseFormats = ['json', 'xml']
    static allowedMethods = [authorize: 'POST', authenticate: 'GET']

    def LTIService
    AccessTokenJsonRenderer accessTokenJsonRenderer
    UserDetailsService userDetailsService
    TokenGenerator tokenGenerator

    def authenticate() {
        if(params.key != null){
            User userToLogin = User.findByOtpIsNotNullAndOtp(params.key);
            if(userToLogin != null)
            {
                userToLogin.setOtp(null);
                userToLogin.save(flush:true);

                UserDetails details = userDetailsService.loadUserByUsername(userToLogin.username);

            AccessToken accessToken = tokenGenerator.generateAccessToken(details)
            response.addHeader 'Cache-Control', 'no-store'
            response.addHeader 'Pragma', 'no-cache'
            render contentType: 'application/json', encoding: 'UTF-8',  text:  accessTokenJsonRenderer.generateJson(accessToken);

//                render status: HttpStatus.FORBIDDEN

            }
            else {
                render status: HttpStatus.FORBIDDEN
            }
        }
        else {
            render status: HttpStatus.FORBIDDEN
        }



    }


    def authorize() {
        def xmlMap = request.getParameterMap()
        HashMap<String, String> fullMap = new HashMap<String, String>();

        for (String key : xmlMap.keySet()) {
            for (String value : xmlMap.get(key)) {
                fullMap.put(key, value)
            }
        }

        String sig = LTIService.generateOAuthSignature("POST", request.getRequestURL().toString(), "my-secret", fullMap)

        if (sig == params.oauth_signature) {

            // if the user isnt in the system then put them in.
            if (User.findByUsername(params.lis_person_contact_email_primary) == null) {
                LTIService.createMoodleUser(fullMap)
            }

            // Get the user to login and log them in..
            String username = params.lis_person_contact_email_primary
            def toLogin = User.findByUsername(username);
            toLogin.setOtp(UUID.randomUUID().toString());
            toLogin.save(flush:true);
//
            String url = "/course/index";
            redirect(url:"http://localhost:4200/#/otp?key="+toLogin.getOtp()+"&resumeRoute="+url);


//            respond model:[token: accessToken, followThroughURL: "http"];
//
//

//            if (fullMap.get("lis_course_section_sourcedid")) {
//                Course course = Course.findBySyllabusId(fullMap.get("lis_course_section_sourcedid"));
//                if (course) {
//                    println("Course found")
//                    if (toLogin.isStudent()) {
//
//                        // TODO Work out if the student is currently enrolled onto the course.
//                        // TODO Otherwise enroll the student onto the course.
//
////                        if (course.students.id.contains(toLogin.student.id)) {
////                            if (fullMap.get("custom_direct_link_id")) {
////                                Lesson lesson = Lesson.get(Long.parseLong(fullMap.get("custom_direct_link_id")))
////                                if (lesson) {
////                                    LessonResult result = lesson.results.find { it.student.id == toLogin.student.id }
////                                    if (result) {
////                                        result.respondUrl = fullMap.get("lis_outcome_service_url")
////                                        result.sourcedid = fullMap.get("lis_result_sourcedid")
////                                        result.save(flush: true)
////                                    } else {
////                                        LessonResult addResult = new LessonResult(student: toLogin.student, score: 0, maxScore: 0)
////                                        addResult.respondUrl = fullMap.get("lis_outcome_service_url")
////                                        addResult.sourcedid = fullMap.get("lis_result_sourcedid")
////                                        lesson.addToResults(addResult)
////                                        lesson.save(flush: true)
////                                    }
////                                    redirect(controller: "lesson", action: "viewLesson", params: [courseId: course.id, lessonId: fullMap.get("custom_direct_link_id")])
////                                } else {
////                                    redirect(controller: "course", action: "show", params: [courseId: course.id])
////                                }
////                            } else {
////                                Student student = toLogin.student
////                                if (!course.results.find { it.student.id == student.id }) {
////                                    CourseResult result = new CourseResult(resultUrl: fullMap.get("lis_outcome_service_url"), resultSourcedId: fullMap.get("lis_result_sourcedid"))
////                                    student.addToCourseResults(result)
////                                    course.addToResults(result)
////                                    student.save(flush: true, failOnError: true)
////                                    course.save(flush: true, failOnError: true)
////                                }
////                                redirect(controller: "course", action: "show", params: [courseId: course.id])
////                            }
////                        }
//
////                        else {
////                            course.addToStudents(toLogin.student)
////                            course.save(flush: true)
////                            if (fullMap.get("custom_direct_link_id")) {
////                                Lesson lesson = Lesson.get(Long.parseLong(fullMap.get("custom_direct_link_id")))
////                                if (lesson) {
////                                    LessonResult result = lesson.results.find { it.student.id == toLogin.student.id }
////                                    if (result) {
////                                        result.respondUrl = fullMap.get("lis_outcome_service_url")
////                                        result.sourcedid = fullMap.get("lis_result_sourcedid")
////                                        result.save(flush: true)
////                                    } else {
////                                        LessonResult addResult = new LessonResult(student: toLogin.student, score: 0, maxScore: 0)
////                                        addResult.respondUrl = fullMap.get("lis_outcome_service_url")
////                                        addResult.sourcedid = fullMap.get("lis_result_sourcedid")
////                                        lesson.addToResults(addResult)
////                                        lesson.save(flush: true)
////                                    }
////                                    redirect(controller: "lesson", action: "viewLesson", params: [courseId: course.id, lessonId: fullMap.get("custom_direct_link_id")])
////                                } else {
////                                    redirect(controller: "course", action: "show", params: [courseId: course.id])
////                                }
////
////                            } else {
////                                Student student = toLogin.student
////                                if (!course.results.find { it.student.id == student.id }) {
////                                    CourseResult result = new CourseResult(resultUrl: fullMap.get("lis_outcome_service_url"), resultSourcedId: fullMap.get("lis_result_sourcedid"))
////                                    student.addToCourseResults(result)
////                                    course.addToResults(result)
////                                    student.save(flush: true, failOnError: true)
////                                    course.save(flush: true, failOnError: true)
////                                }
////                                redirect(controller: "course", action: "show", params: [courseId: course.id])
////                            }
////                        }
//                    } else {
//
////                        TODO if they are a faculty then check they are a moderator of the course.
////                        TODO if they're not then add them to the mods of the course
//
////                        TODO if the response contains the custom_direct_link_id then take the user directly to the course. Otherwise take them to the course index page.
//
////                        if (course.faculty.id.contains(toLogin.faculty.id)) {
////                            if (fullMap.get("custom_direct_link_id")) {
////                                redirect(controller: "lesson", action: "viewLesson", params: [courseId: course.id, lessonId: fullMap.get("custom_direct_link_id")])
////                            } else {
////                                redirect(controller: "course", action: "show", params: [courseId: course.id])
////                            }
////                        } else {
////                            course.addToFaculty(toLogin.faculty)
////                            course.save(flush: true)
////                            if (fullMap.get("custom_direct_link_id")) {
////                                redirect(controller: "lesson", action: "viewLesson", params: [courseId: course.id, lessonId: fullMap.get("custom_direct_link_id")])
////                            } else {
////                                redirect(controller: "course", action: "show", params: [courseId: course.id])
////                            }
////                        }
//                    }
//                } else {
//                    if (toLogin.faculty) {
//                        course = new Course(name: fullMap.get("context_title"),
//                                syllabusId: fullMap.get("lis_course_section_sourcedid"),
//                                description: "Not Provided",
//                                startDate: new Date(),
//                                endDate: new Date(),
//                                applicantCap: 40)
//                        course.addToFaculty(toLogin.faculty)
//                        course.save(flush: true, failOnError: true)
//                        redirect(controller: "course", action: "show", params: [courseId: course.id])
//                    } else {
//                        redirect(controller: "student", action: "index")
//                    }
//                }
//            } else {
//                redirect(controller: "student", action: "index")
//            }
        } else {
            render "Test";
        }
    }

}

