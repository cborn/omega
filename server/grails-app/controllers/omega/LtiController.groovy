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
            User userToLogin = User.findByOtpIsNotNullAndOtp(params.key)
            if (userToLogin != null) {
                userToLogin.setOtp(null)
                userToLogin.save(flush: true)

                UserDetails details = userDetailsService.loadUserByUsername(userToLogin.username)

                AccessToken accessToken = tokenGenerator.generateAccessToken(details)
                response.addHeader 'Cache-Control', 'no-store'
                response.addHeader 'Pragma', 'no-cache'
                render contentType: 'application/json', encoding: 'UTF-8', text: accessTokenJsonRenderer.generateJson(accessToken)

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
        HashMap<String, String> fullMap = new HashMap<String, String>()

        for (String key : xmlMap.keySet()) {
            for (String value : xmlMap.get(key)) {
                fullMap.put(key, value)
            }
        }


        // firstly lets get the site..

        Site site = Site.findByMoodleUrlIlike("%" + request.getHeader("Origin") + "%")
        if (!site) {
            render "Could not find the site associated to this moodle instance. Please make sure a site with the moodle url : " + request.getHeader("Origin") + " exists."
            return
        }

        log.debug("Getting the current term")
        Term currentTerm = Term.findByCurrentAndSite(true, site)


        String proxyUrl = System.getenv("LL_PROXY_URL");
        if (!proxyUrl)
            proxyUrl = request.getRequestURL().toString();


        log.debug("Generating OAuth Signature")
        String sig = LTIService.generateOAuthSignature("POST", proxyUrl, site.getMoodleKey(), fullMap)
        log.debug("OAuth Signature generated - " + sig)
        if (sig == params.oauth_signature) {

            log.debug("Signature from request matched - That means this is a validated request.")

            //TODO change this to use the moodle userid not the email address.

            def toLogin = User.findByMoodle_user_id(params.user_id)
            // if the user isnt in the system then put them in.
            if (toLogin == null) {
                log.debug("failed to find an existing user for moodle id  - " + params.user_id)
                log.debug("creating a new user from moodle.")
                LTIService.createMoodleUser(site, fullMap)
                toLogin = User.findByMoodle_user_id(params.user_id)
            } else if (!toLogin.getUsername().equalsIgnoreCase(params.lis_person_contact_email_primary)) {
                // check the username is still the same ...
                toLogin.setUsername(params.lis_person_contact_email_primary);
                toLogin.setFirstname(params.lis_person_name_given);
                toLogin.setSurname(params.lis_person_name_family);
            }
            // Get the user to login and log them in..
            toLogin.setOtp(UUID.randomUUID().toString())
            toLogin.save(flush: true)

            // This is the variable to update if we want to change the route action.
            String url = "/course/index"

            if (fullMap.get("lis_course_section_sourcedid")) {
                Course course = Course.findByMoodle_master_id(fullMap.get("lis_course_section_sourcedid"))
                if (course) {
                    log.debug("Found the course")
                    if (toLogin.isStudent()) {

                        // Enroll the student on the course..

                        // Find a lesson on this course.
                        Lesson lesson = course.lessons.first();

                        // With the lesson - enroll the user.

                        if (!Enrollment.findByUserAndTermAndLesson(toLogin, currentTerm, lesson)) {
                            // we're not already enrolled onto this lesson so go and do it.
                            new Enrollment(user: toLogin, lesson: lesson, term: currentTerm).save(flush: true);
                        }

                        if (fullMap.get("custom_direct_link_id")) {
                            LessonPage lessonPage = LessonPage.get(Long.parseLong(fullMap.get("custom_direct_link_id")))
                            if (lessonPage) {

                                // TODO respond url seems to be something important so work out what this is...
                                log.debug("Contents of lis_outcome_service_url - " + fullMap.get("lis_outcome_service_url"))
                                log.debug("contents of lis_result_sourcedid - " + fullMap.get("lis_result_sourcedid"))
                                Submission submission = Submission.findByUserAndPageAndTerm(toLogin, lessonPage, currentTerm)
                                if (!submission)
                                    submission = new Submission(page: lessonPage, user: toLogin, term: currentTerm, drafted: new Date()).save(flush: true)

                                url = "/student/submission/" + submission.id


                            } else {
                                url = "/lesson/index/" + course.id
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
                            url = "/lesson/index/" + course.id
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
                            LessonPage lesson = LessonPage.get(Long.parseLong(fullMap.get("custom_direct_link_id")))
                            if (lesson) {
                                url = "/faculty/gradebook/" + lesson.lessonId;
//                                url = "lessonPage/builder/" + fullMap.get("custom_direct_link_id")
                            } else {
                                url = "/lesson/index/" + course.id
                            }
                        } else {
                            url = "/lesson/index/" + course.id
                        }

                    }
                } else {
                    if (toLogin.isFaculty()) {
                        log.debug("Course Not Found - Creating a new course")

                        course = new Course(name: fullMap.get("context_title"),
                                moodle_master_id: fullMap.get("lis_course_section_sourcedid"))
                        course.addToOwners(toLogin)
                        course.term = currentTerm
                        course.save(flush: true, failOnError: true)

                        log.debug(course.toString())

                        url = "/lesson/index/" + course.id
                    } else {
                        url = "/student/index"
                    }
                }
            } else {
                url = "/student/index"
            }

            String baseUrl = System.getenv("LL_APPLICATION_URL")

            redirect(url: baseUrl + "/#/otp?key=" + toLogin.getOtp() + "&resumeRoute=" + url)


        } else {
            render "Signature of the Tool configured in moodle does not match the signature of this application. Please check your moodle secret key configuration and ensure it matches this sites configuration."

        }
    }

}

