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
        post "/submission/complete" (controller:'submission',action: 'complete')
        post "/submission/seen/$id" (controller:'submission',action: 'seen')
        post "/submission/grade/$id" (controller:'submission',action: 'grade')
        post "/questionResponse/addRecording" (controller:'questionResponse',action: 'addRecording')
        post "/questionResponse/addTextComment" (controller:'questionResponse',action: 'addTextComment')






        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
