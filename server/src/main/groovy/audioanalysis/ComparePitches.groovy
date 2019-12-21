
/**
 *
 * @author listopad
 */
package audioanalysis

import com.fastdtw.dtw.FastDTW
import com.fastdtw.timeseries.*
import com.fastdtw.util.Distances
import org.grails.web.json.JSONArray
import org.grails.web.json.JSONException
import org.grails.web.json.JSONObject

import java.util.regex.Matcher
import java.util.regex.Pattern;


public class ComparePitches{
  //Executes the preprocessing bash script which removes noise and silence and the beginning and end of both recoridngs  
    public audioPreprocessing(String f1, String f2, String location) {
        try {
            Process procBuildScript = new ProcessBuilder("src/main/shell/dtw_preproc.sh",f1, f2, location).inheritIO().start();
            procBuildScript.waitFor();
        }catch (Exception e) {
        throw new Exception(e);
		}
    }
    
    //parses the Praat pitch annotations and extracts time & pitch
    public parseAnnotations(String annot){
        HashMap<Float,Float> pitches = new HashMap<Float,Float>();
 
        def start_regex = "(?<=\"start\":)[^,]*(?=,\"pitch\")"
        def pitch_regex = "(?<=\"pitch\":)[^,]*(?=,\"intensity\")"
        
        final Matcher ms = Pattern.compile(start_regex).matcher(annot)
        List<String> matches_start = new ArrayList<>();
        while (ms.find()){
            matches_start.add(ms.group(0).toString())
        }
        
        final Matcher mp = Pattern.compile(pitch_regex).matcher(annot)
        List<String> matches_pitch = new ArrayList<>();
        while (mp.find()){
            matches_pitch.add(mp.group(0).toString())
        }
        
        
        for (int i=0; i<matches_start.size();i++)
        {
            float start = Float.valueOf(matches_start[i])
            float pitchVal = Float.valueOf(matches_pitch[i])
            pitches.put(start, pitchVal)
        }
        return pitches
    }
    
    public class SimArray
    {
        JSONArray arr_two;
        double sc; 
        
        SimArray(JSONArray a, double s){
            arr_two = a;
            sc = s;
        }
    }
    
    public similarityScore(pitch1, pitch2, location){
        //troughout this file, 1 refers to model and 2 refers to student
        def str_p1 = pitch1.toString()
        def str_p2 = pitch2.toString()
        
        def pitches1_0 = parseAnnotations(str_p1)
        //intensities & pitches1
        def pitches2_0 = parseAnnotations(str_p2)  
        
        HashMap<Float,Float> pitches1 = new HashMap<Float,Float>();
        HashMap<Float,Float> pitches2 = new HashMap<Float,Float>();
        
        //the bash script leaves about 50 msecs of silence at the beginning, so shift both recordings by that much
        def shift1 = Collections.min(pitches1_0.keySet())
        for (Float start_time1 : pitches1_0.keySet()){
            def Float new_start_time1 = Math.round((start_time1 - shift1) * 100.0) / 100.00
            def Float new_value1 = pitches1_0[start_time1]
            pitches1.put(new_start_time1, new_value1)
        }
        
        def shift2 = Collections.min(pitches2_0.keySet())
        for (Float start_time2 : pitches2_0.keySet()){
            def Float new_start_time2 = Math.round((start_time2 - shift2) * 100.0) / 100.0
            def Float new_value2 = pitches2_0[start_time2]
            pitches2.put(new_start_time2, new_value2)
        }
        //compute average pitch for both & the difference in averages
        def sum1 = 0
        for (elem in pitches1.values()){
            sum1+=elem
        }
        def avg1 = sum1.div(pitches1.size())
        
        def sum2 = 0
        for (elem in pitches2.values()){
            sum2+=elem
        }
        def avg2 = sum2.div(pitches2.size())   
        
        def diff_avgs = avg1-avg2 
        
        HashMap<Float,Float> pitches1_2 = new HashMap<Float,Float>();
        
        for (Float pitchKey1 : pitches1.keySet()){ //rounding
           def Float pitchKey1_changed = Math.round((pitchKey1)*100)/100;
           pitches1_2.put(pitchKey1_changed, pitches1[pitchKey1]) 
        }
  
        HashMap<Float,Float> pitches2_2 = new HashMap<Float,Float>();
        
       //shift student pitch vertically by diff_avgs to match the average pitch of model
       
       for (Float pitchKey2 : pitches2.keySet()){
           def Float pitchKey2_changed = Math.round((pitchKey2)*100)/100;
           def Float pitchValue2_changed = pitches2[pitchKey2] + diff_avgs
           pitches2_2.put(pitchKey2_changed, pitchValue2_changed)
       }

       //if a model is defined at a time when the student isn't, put 0, and vice versa
        HashMap<Float,Float> pitches1_fin = new HashMap<Float,Float>();
        
        for (Float pitchKey1 : pitches1_2.keySet()){
            pitches1_fin.put(pitchKey1, pitches1_2[pitchKey1])
            def Float startNext1 = Math.round((pitchKey1+0.01)*100)/100;
            if (!pitches1_2.keySet().contains(startNext1)){
                pitches1_fin.put(startNext1, 0)
            }
        }
        
        HashMap<Float,Float> pitches2_fin = new HashMap<Float,Float>();
         
        for (Float pitchKey2 : pitches2_2.keySet()){
            pitches2_fin.put(pitchKey2, pitches2_2[pitchKey2])
            def Float startNext2 = Math.round((pitchKey2+0.01)*100)/100;
            
            if (!pitches2_2.keySet().contains(startNext2)){
                pitches2_fin.put(startNext2, 0)
            }
        }
        
        /*
        we want student and model recordings to match in length. Rescale the x axis (keyset) of the student recording
        to match that of the model recording
        */
       
        def max_start1
        def max_start2
        
        max_start1 = Collections.max(pitches1_fin.keySet())
        max_start2 = Collections.max(pitches2_fin.keySet())
        
        HashMap<Float,Float> pitches2_rescaled = new HashMap<Float,Float>();
        
        def time_ratio = max_start1.div(max_start2) 
        time_ratio = Math.round(time_ratio*100)/100
        println time_ratio
        
        for (Float pitchKey2 : pitches2_fin.keySet()){
            def key_rescaled = Math.round((pitchKey2*time_ratio)*100)/100
            pitches2_rescaled.put(key_rescaled.floatValue(), pitches2_fin[pitchKey2].floatValue())
        }
        
        /* compute similarity score using fast Dynamic Time Warping. 
         So far even though the algorithm looks like it should be predictive, it hasn't been, so more testing is needed.
         Visualization is reliable, though.
        */
        def model = TimeSeriesBase.builder();
        for (Float each1 : pitches1_fin.keySet()){
            model.add(each1, pitches1_fin[each1])
        }
        def m = model.build();
       
        def student = TimeSeriesBase.builder();
        for (Float each2 : pitches2_rescaled.keySet()){
            student.add(each2, pitches2_rescaled[each2])
        } 
        def s = student.build(); 
        
        double dtwDist = FastDTW.compare(m, s, 10, Distances.EUCLIDEAN_DISTANCE).getDistance();
        println dtwDist
        
        def json_arr = CreateJsonArray(pitches1_fin, pitches2_rescaled)

        return new SimArray(json_arr, dtwDist)
    }
    
    
    public CreateJsonArray(pitches1_fin, pitches2_rescaled){
        List<Map<String, Object>> Json = new ArrayList<Map<String, Object>>()
        
        /*
         I had problems earlier with variable types - the two lines of code below are
        to check that timestamps in the student and model arrays are of the same type
         
        println pitches1_fin.keySet().sort()[0].getClass().getName() 
        println pitches2_rescaled.keySet().sort()[0].getClass().getName()
        */
        
        //creates a combined array of the form {timestamp, model pitch, student pitch}
        for (int i=0; i<pitches1_fin.size();i++){
            Map<String, Object> t = new HashMap<String, Object>();
            def st1 = pitches1_fin.keySet().sort()[i]
            t.put("start",Math.round(st1 * 100.0) / 100.00)
            def p1 = pitches1_fin[st1]
            t.put("model",Math.round(p1 * 100.0) / 100.00)
    
            if (pitches2_rescaled.keySet().contains(st1)){
                def p2 = pitches2_rescaled[st1]
                t.put("student",Math.round(p2 * 100.0) / 100.00)
                pitches2_rescaled.keySet().remove(st1)
            }
            else{
            t.put("student",0)  
            }
            
            Json.add(t) 
            
        }
            
        for (int j=0; j<pitches2_rescaled.keySet().size();j++){
            Map<String, Object> t2 = new HashMap<String, Object>();
            def st2 = pitches2_rescaled.keySet().sort()[j]
            t2.put("start",Math.round(st2 * 100.0) / 100.00)
            t2.put("model",0)
            def p_st = pitches2_rescaled[st2]
            t2.put("student",Math.round(p_st * 100.0) / 100.00)
            
            Json.add(t2)
            }
        
        Comparator<Map<String, Object>> mapComparator = new Comparator<Map<String, Object>>() {
        int compare(Map<String, Object> m1, Map<String, Object> m2) {
        return m1.get("start").compareTo(m2.get("start"));
            }
        }
        
        //sorts by array by time
        Collections.sort(Json, mapComparator);
        
        JSONArray json_arr=new JSONArray();
        for (Map<String, Object> map : Json) {
            JSONObject json_obj=new JSONObject();
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();
                try {
                    json_obj.put(key,value);
                } catch (JSONException e) {
                    e.printStackTrace();
                }                           
            }
            json_arr.put(json_obj);
        }
        return json_arr
    }
    
    public static void main(String[] args){    
        
    }
}

