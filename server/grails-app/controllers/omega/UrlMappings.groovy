package omega

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action:"delete")
        get "/$controller(.$format)?"(action:"index")
        get "/$controller/$id(.$format)?"(action:"show")
        post "/$controller(.$format)?"(action:"save")
        put "/$controller/$id(.$format)?"(action:"update")
        patch "/$controller/$id(.$format)?"(action:"patch")


        post "/user/saveAsSuperAdmin"(controller:'user', action:'saveAsSuperAdmin')


        post "/question/addImage/$id" (controller:'question', action: 'addImage')
        delete "/question/removeImage/$id" (controller:'question', action: 'removeImage')
        post "/question/promptRecording/$id" (controller:'question', action: ' addPromptRecording')
        delete "/question/promptRecording/$id" (controller:'question', action: ' removePromptRecording')
        post "/question/promptImage/$id" (controller:'question', action: ' addPromptImage')
        delete "/question/promptImage/$id" (controller:'question', action: ' removePromptImage')
        post "/question/feedbackRecording/$id" (controller:'question', action: ' addFeedbackRecording')
        delete "/question/feedbackRecording/$id" (controller:'question', action: ' removeFeedbackRecording')

        delete "/question/remove/$id" (controller:'question', action: 'remove')
        get "/lessonPage/moveUp/$id" (controller:'lessonPage', action: 'moveUp')
        get "/lessonPage/moveDown/$id" (controller:'lessonPage', action: 'moveDown')
        get "/lessonPage/export/$id" (controller:'lessonPage', action: 'export')
        post "/lessonPage/import/$id" (controller:'lessonPage', action: 'importAction')

        get "/enrollment/$id" (controller: "enrollment", action:"index")
        get "/enrollment/show/$id"(controller: "enrollment", action:"show")
        get "/enrollment/grades/$id"(controller: "enrollment", action:"grades")
        get "/term/promote/$id"(controller: "term", action:"promoteToCurrent")

        post "/lti/authorize" (controller:'lti', action: 'authorize')
        get "/lti/authenticate" (controller:'lti', action: 'authenticate')
        post "/submission/addRecording" (controller:'submission',action: 'addRecording')
        post "/submission/complete" (controller:'submission',action: 'complete')
        post "/submission/seen/$id" (controller:'submission',action: 'seen')
        post "/submission/grade/$id" (controller:'submission',action: 'grade')
        post "/questionResponse/addRecording" (controller:'questionResponse',action: 'addRecording')
        post "/questionResponse/addTextComment" (controller:'questionResponse',action: 'addTextComment')

        get "/audioAnalysis/getPitch"(controller: "audioAnalysis", action:"getPitchForRecording")
        post "/audioAnalysis/compare"(controller: "audioAnalysis", action:"compPitches")




        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
