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
        post "/question/promptRecording/$id" (controller:'question', action: ' addPromptRecording')
        delete "/question/promptRecording/$id" (controller:'question', action: ' removePromptRecording')
        post "/question/promptImage/$id" (controller:'question', action: ' addPromptImage')
        delete "/question/promptImage/$id" (controller:'question', action: ' removePromptImage')
        post "/question/feedbackRecording/$id" (controller:'question', action: ' addFeedbackRecording')
        delete "/question/feedbackRecording/$id" (controller:'question', action: ' removeFeedbackRecording')

        delete "/question/remove/$id" (controller:'question', action: 'remove')
        get "/lessonPage/moveUp/$id" (controller:'lessonPage', action: 'moveUp')
        get "/lessonPage/moveDown/$id" (controller:'lessonPage', action: 'moveDown')
        get "/enrollment/grades/$id"(controller: "enrollment", action:"grades")

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
