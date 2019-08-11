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
        if (params.key != null) {
            User userToLogin = User.findByOtpIsNotNullAndOtp(params.key);
            if (userToLogin != null) {
                userToLogin.setOtp(null);
                userToLogin.save(flush: true);

                UserDetails details = userDetailsService.loadUserByUsername(userToLogin.username);

                AccessToken accessToken = tokenGenerator.generateAccessToken(details)
                response.addHeader 'Cache-Control', 'no-store'
                response.addHeader 'Pragma', 'no-cache'
                render contentType: 'application/json', encoding: 'UTF-8', text: accessTokenJsonRenderer.generateJson(accessToken);

//                render status: HttpStatus.FORBIDDEN

            } else {
                render status: HttpStatus.FORBIDDEN
            }
        } else {
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

        log.debug("Getting the current term");
        Term currentTerm = Term.findByCurrent(true);


        log.debug("Generating OAuth Signature")
        String sig = LTIService.generateOAuthSignature("POST", request.getRequestURL().toString(), "my-secret", fullMap)
        log.debug("OAuth Signature generated - " + sig)
        if (sig == params.oauth_signature) {

            log.debug("Signature from request matched - That means this is a validated request.")

            // if the user isnt in the system then put them in.
            if (User.findByUsername(params.lis_person_contact_email_primary) == null) {
                log.debug("failed to find an existing user for the email - " + params.lis_person_contact_email_primary)
                log.debug("creating a new user from moodle.");
                LTIService.createMoodleUser(fullMap)
            }

            // Get the user to login and log them in..
            String username = params.lis_person_contact_email_primary
            def toLogin = User.findByUsername(username);
            toLogin.setOtp(UUID.randomUUID().toString());
            toLogin.save(flush: true);

            // This is the variable to update if we want to change the route action.
            String url = "/course/index";

            if (fullMap.get("lis_course_section_sourcedid")) {
                Course course = Course.findBySyllabusId(fullMap.get("lis_course_section_sourcedid"));
                if (course) {
                    log.debug("Found the course")
                    if (toLogin.isStudent()) {
//
//                        // TODO Work out if the student is currently enrolled onto the course.
//                        // TODO Otherwise enroll the student onto the course.
//
                        // See if this student is  currently enrolled onto this course for this term.

                        Enrollment enrollment = Enrollment.findByTermAndCourseAndUser(currentTerm, course, toLogin);

                        if (!enrollment) {
                            // TODO we need to enroll the student before we do anything..
                            enrollment = new Enrollment(term: currentTerm, course: course, user: toLogin).save(failOnError: true, flush: true);
                        }

                        if (fullMap.get("custom_direct_link_id")) {
                            Lesson lesson = Lesson.get(Long.parseLong(fullMap.get("custom_direct_link_id")))
                            if (lesson) {

                                // TODO respond url seems to be something important so work out what this is...
                                log.debug("Contents of lis_outcome_service_url - " + fullMap.get("lis_outcome_service_url"));
                                log.debug("contents of lis_result_sourcedid - " + fullMap.get("lis_result_sourcedid"))
//                                    LessonResult result = lesson.results.find { it.student.id == toLogin.student.id }
//                                    if (result) {
//                                        result.respondUrl = fullMap.get("lis_outcome_service_url")
//                                        result.sourcedid = fullMap.get("lis_result_sourcedid")
//                                        result.save(flush: true)
//                                    } else {
//                                        LessonResult addResult = new LessonResult(student: toLogin.student, score: 0, maxScore: 0)
//                                        addResult.respondUrl = fullMap.get("lis_outcome_service_url")
//                                        addResult.sourcedid = fullMap.get("lis_result_sourcedid")
//                                        lesson.addToResults(addResult)
//                                        lesson.save(flush: true)
//                                    }
//                                    redirect(controller: "lesson", action: "viewLesson", params: [courseId: course.id, lessonId: fullMap.get("custom_direct_link_id")])
                            } else {
                                url = "/course/show/" + course.id;
                            }
                        } else {
//                                Student student = toLogin.student
//                                if (!course.results.find { it.student.id == student.id }) {
//                                    CourseResult result = new CourseResult(resultUrl: fullMap.get("lis_outcome_service_url"), resultSourcedId: fullMap.get("lis_result_sourcedid"))
//                                    student.addToCourseResults(result)
//                                    course.addToResults(result)
//                                    student.save(flush: true, failOnError: true)
//                                    course.save(flush: true, failOnError: true)
//                                }
//                                redirect(controller: "course", action: "show", params: [courseId: course.id])
                            url = "/course/show/" + course.id;
                        }


                    } else {

//                        TODO if they are a faculty then check they are a moderator of the course.
//                        TODO if they're not then add them to the mods of the course

//                        TODO if the response contains the custom_direct_link_id then take the user directly to the course. Otherwise take them to the course index page.

                        if (!course.owners.id.contains(toLogin.id)) {
                            course.addToOwners(toLogin)
                            course.save(flush: true)
                        }

                        if (fullMap.get("custom_direct_link_id")) {
                            url = "lesson/show/" + fullMap.get("custom_direct_link_id");
                        } else {
                            url = "/course/show/" + course.id;
                        }

                    }
                } else {
                    if (toLogin.isFaculty()) {
                        log.debug("Course Not Found - Creating a new course");

                        course = new Course(name: fullMap.get("context_title"),
                                syllabusId: fullMap.get("lis_course_section_sourcedid"))
                        course.addToOwners(toLogin)
                        course.save(flush: true, failOnError: true)

                        log.debug(course.toString());

                        url = "/course/show/" + course.id;
                    } else {
                        url = "/student/index";
                    }
                }
            } else {
                url = "/student/index";
            }



            redirect(url: "http://localhost:4200/#/otp?key=" + toLogin.getOtp() + "&resumeRoute=" + url);


        } else {
            render "Test";
        }
    }

}

