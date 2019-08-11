package omega

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")

        post "/question/addImage/$id" (controller:'question', action: 'addImage')
        delete "/question/remove/$id" (controller:'question', action: 'remove')
        get "/lessonPage/moveUp/$id" (controller:'lessonPage', action: 'moveUp')
        get "/lessonPage/moveDown/$id" (controller:'lessonPage', action: 'moveDown')
        post "/lti/authorize" (controller:'lti', action: 'authorize')
        get "/lti/authenticate" (controller:'lti', action: 'authenticate')
        post "/submission/addRecording" (controller:'submission',action: 'addRecording')




        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
