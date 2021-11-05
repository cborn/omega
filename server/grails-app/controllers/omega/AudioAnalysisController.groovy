package omega

import audioanalysis.ComparePitches
import audioanalysis.PraatPitchDetection
import grails.plugin.springsecurity.annotation.Secured
import grails.converters.*
import net.minidev.json.JSONArray
import org.grails.web.json.JSONObject


class TwoAudioFiles  {
    String model
    String student
}



@Secured(['ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_FACULTY','ROLE_GRADER', 'ROLE_STUDENT'])
class AudioAnalysisController {
	static responseFormats = ['json', 'xml']

    AWSUploaderService AWSUploaderService

    def EmptyData(JSONObject data) {
        if (data) {
            return false
        }
        log.error("request json params is empty")
        render(status: 400, contentType: 'application/json') {
            error "Empty request data, malformed request? "
        }
        return true
    }


    def compPitches() {
        def d = request.JSON
        if (EmptyData(d)) {
            return
        }
        TwoAudioFiles source_filenames
        try {
            source_filenames = new TwoAudioFiles(d)
        } catch (Exception e){
            log.error("invalid parameters", e)
            render(status: 400, contentType: 'application/json'){
                message e.toString()
            }
            return
        }


        AudioComparison comparison = AudioComparison.findByModelAndSource(source_filenames.model,source_filenames.student);

        if(comparison) {
            return ReturnAll3(comparison)
        }

        def arr_simsc = compareTwo(source_filenames.model, source_filenames.student);

        comparison = new AudioComparison(model: source_filenames.model,source: source_filenames.student, score: arr_simsc[0] as double, dtw_distances: arr_simsc[1] as List<AudioComparisonPoint>).save(flush:true);

        return ReturnAll3(comparison)
    }

    /*******************************************************
     HELPER FUNCTIONS
     *******************************************************/

    def compareTwo(String key1, String key2){

        String requestId = UUID.randomUUID().toString();


        AudioProperty im = AudioProperty.findByAwsKey(key1);
        if(!im) {
            render "";
        }
        File file = AWSUploaderService.download(key1,im.site);


        AudioProperty im2 = AudioProperty.findByAwsKey(key2);
        if(!im2) {
            render "";
        }
        File file2 = AWSUploaderService.download(key2,im2.site);

    
        // Now we have the 2 files downloaded to compare.


        def location = System.getenv("LL_DTW_WORKDIR");


        ComparePitches pitches = new ComparePitches();
        pitches.audioPreprocessing(file.getAbsolutePath(), file2.getAbsolutePath(), location,requestId)

        def pitch1 = getPitchJson(location + 'model_'+requestId+'_final.wav')
        //println pitch1
        def pitch2 = getPitchJson(location + 'student_'+requestId+'_final.wav')
        //println pitch2
        def out = pitches.similarityScore(pitch1, pitch2)

        def vals = out.dtw_distances
        def sim_score = out.similarity_score

        return [sim_score, vals]
    }

    def getPitchJson(String filepath) {
        // Extract file pitch information
        def pitchData = extractPitch(filepath)

        JSON.use('deep') {
            return pitchData as JSON
        }
    }

    def extractPitch(String filepath) {
        def pitchData
        PraatPitchDetection praatPitch = new PraatPitchDetection(filepath)
        pitchData = praatPitch.executePitchDetection()
        pitchData.filepath = filepath
        return pitchData
    }


    def ReturnAll3(comparison) {
        //returns (1) similarity score, (2&3) rescaled pitches and intensities for the model & student recordings

        def points = comparison.dtw_distances.sort {a,b ->
            return a.start <=> b.start;
        }
        def l = [comparison.score,points];


        JSON.use('deep') {
            render l as JSON
        }
        return
    }




    def getPitchForRecording() {

        def pitchDetection = getPitchForAwsKey(params.key)

        JSON.use('deep') {
            render pitchDetection as JSON
        }
    }



    AudioAnalysis getPitchForAwsKey(key) {

        AudioAnalysis pitchDetection = AudioAnalysis.findByFilepath(key)


        if(pitchDetection != null) {
            return pitchDetection;
        }
        else {
            // download the audio file locally - then process it.
            AudioProperty im = AudioProperty.findByAwsKey(key);
            if(!im) {
                render "";
            }
            File file = AWSUploaderService.download(key,im.site);


            PraatPitchDetection praatPitch = new PraatPitchDetection(file.getAbsolutePath())
            pitchDetection = praatPitch.executePitchDetection()
            pitchDetection.filepath = key


            pitchDetection.save(flush:true)

           return pitchDetection;


        }



    }




    def index() { }
}
