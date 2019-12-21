package audioanalysis

import omega.AudioAnalysis
import omega.PitchAnnotation
import omega.PraatPitchAnnotation;

/*
Class to run praat scripts and return pitch results from praat.
Assumes this will be running on a unix based OS and so commands are in
unix form. If this runs on a server running a different OS, command format
should be updated.

For Annotation objects created by PraatPitchDetection, the probability value will
be replaced with intensity values.
*/

public class PraatPitchDetection {
    private String filepath
    private SCRIPT = "/opt/audio_deps/praat_scripts/get.pitch.and.intensity.praat "
    String PRAAT = "/opt/audio_deps/praat.app/Contents/MacOS/Praat --run "
    String UNDEFINED = "--undefined--"


    public PraatPitchDetection(String filepath) {
        this.filepath = filepath
    }

    //public List<List<PitchAnnotation>> executePitchDetection() {
    public AudioAnalysis executePitchDetection() {
        // Create a new command string and run command.
        String cwd = System.getProperty("user.dir")
        String fullCommand = PRAAT + SCRIPT + this.filepath
        String commandOutput

        try {
            commandOutput = this.executeCommand(fullCommand)
        } catch (Exception e) {
            throw e
        }


        def pitchAnnotations = new AudioAnalysis()
        def pitchBlock = new PraatPitchAnnotation()
        pitchBlock.save()

        String[] lines = commandOutput.split("\n")
        for (String line : lines) {
            String[] vals = line.split(" ")
            // Output comes in the form of time pitch intensity in .01 second intervals.
            // Check if either pitch or intensity is undefined.
            if (vals[1].contains(UNDEFINED) || vals[2].contains(UNDEFINED)) {
                if (pitchBlock.pitchAnnotations != null) {
                    // dump into pitchAnnotations and empty.
                    pitchAnnotations.addToPraatPitchAnnotations(pitchBlock)

                    //pitchBlock = new ArrayList<PitchAnnotation>()
                    pitchBlock = new PraatPitchAnnotation()
                    pitchBlock.save()

                }
                continue
            }
            double start = Double.parseDouble(vals[0])
            double pitchInHz = Double.parseDouble(vals[1])
            double intensity = Double.parseDouble(vals[2])
            def annot = new PitchAnnotation(start: start, pitch: pitchInHz, intensity: intensity)
            annot.save()
            pitchBlock.addToPitchAnnotations(annot)

        }
        if (pitchBlock.pitchAnnotations != null) {
            pitchAnnotations.addToPraatPitchAnnotations(pitchBlock)
        }
        pitchAnnotations.save()
        return pitchAnnotations
    }


    private String executeCommand(String command) {

        StringBuffer output = new StringBuffer()

        Process p
        try {
            p = Runtime.getRuntime().exec(command)
            p.waitFor()
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(p.getInputStream()))

            BufferedReader stdError = new BufferedReader(new
                    InputStreamReader(p.getErrorStream()))

            String line = ""
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n")
            }

        } catch (Exception e) {
            throw new Exception(e);
        }
        return output.toString();


    }

}
