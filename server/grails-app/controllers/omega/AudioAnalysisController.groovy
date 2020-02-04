package omega

import audioanalysis.PraatPitchDetection
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER', 'ROLE_STUDENT'])
class AudioAnalysisController {
	static responseFormats = ['json', 'xml']

    AWSUploaderService AWSUploaderService

    def getPitchForRecording() {

        def pitchDetection = AudioAnalysis.findByFilepath(params.key)


        if(pitchDetection != null) {

            JSON.use('deep') {
                render pitchDetection as JSON
            }
        }
        else {
            // download the audio file locally - then process it.
            AudioProperty im = AudioProperty.findByAwsKey(params.key);
            if(!im) {
                render "";
            }
            File file = AWSUploaderService.download(params.key,im.site);

            AudioAnalysis pitchData
            PraatPitchDetection praatPitch = new PraatPitchDetection(file.getAbsolutePath())
            pitchData = praatPitch.executePitchDetection()
            pitchData.filepath = params.key


            pitchData.save(flush:true)

            JSON.use('deep') {
                render pitchData as JSON
            }


        }

    }

    def index() { }
}
