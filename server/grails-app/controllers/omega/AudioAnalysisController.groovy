package omega

import audioanalysis.PraatPitchDetection
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*

@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER'])
class AudioAnalysisController {
	static responseFormats = ['json', 'xml']

    AWSUploaderService AWSUploaderService

    def getPitchForRecording() {

        def pitchDetection = AudioAnalysis.findByFilepath(params.key);

        if(pitchDetection != null) {
            JSON.use('deep') {
                render pitchDetection as JSON
            }
        }
        else {
            // download the audio file locally - then process it.

            File file = AWSUploaderService.download(params.key);

            AudioAnalysis pitchData;
            PraatPitchDetection praatPitch = new PraatPitchDetection(file.getAbsolutePath())
            pitchData = praatPitch.executePitchDetection()
            pitchData.filepath = params.key;


            pitchData.save(flush:true);

            JSON.use('deep') {
                render pitchData as JSON
            }


        }

    }

    def index() { }
}
