# Python conversion of shell dtw_preproc.sh file
# Kate Richardson 12-3-2018

import sox
import ffmpeg
import os
import sys

"""
what is this line: i=$(echo $i+1 | bc -l) #for duration
"""

def get_basename(audio_filepath):
    """Finds the file basename from the filepath for naming new files"""

    #This function will return empty if last char is a /, but I don't think that's a problem. It should always be something.flac or something.wav
    basename = os.path.basename(audio_filepath)
    
    print(basename)
    
    path_parts = basename.split(".")
    basename = path_parts[0]
    file_type = path_parts[1]

    if path_parts[1] != ('wav' or 'flac'):
        raise ValueError('Audio files must be .flac or .wav')
        
    print(basename)
    
    return basename

def get_file_type(audio_filepath):
    basename = os.path.basename(audio_filepath)
    path_parts = basename.split(".")
    basename = path_parts[0]
    file_type = path_parts[1]

    if path_parts[1] != ('wav' or 'flac'):
        raise ValueError('Audio files must be .flac or .wav')

    return path_parts[1]
    

def clean_audio(file_to_clean, location_to_store_output, student_or_model, file_num):
    """Removes noise and silences at beginning and end of a file and moves it to the temp directory
    @param file_to_clean Audio file to be cleaned
    @param location_to_store_output directory to store the new file NOTE do not include final /
    @param student_or_model Specify whether it's a student or model file
    @param file_num Unique identifier (so no files are overwritten

    todos: Might want to fix to allow for final /
    Make better unique filenames
    Always returns an overwrite statement on the build. Is there any way to avoid this?"""
    # TODO: There is probably a better way to name these files-- find out what the originals are named.
    
    path = location_to_store_output + "/"

    rec = file_to_clean

     # get noise profile and remove noise
    
    tfm = sox.Transformer()

   
    profile_filename = "profile_" + student_or_model + ".txt"


    tfm.noiseprof(rec, profile_filename)
    tfm.noisered(profile_filename, 0.21)
    
    tfm.silence(1)
    tfm.reverse()
    tfm.silence(1)
    tfm.reverse()


    # make suitable unique filename and create file (build doesn't work unless file is already created)
    file_basename = get_basename(file_to_clean)
    unique_filename = path + file_basename + str(file_num) + "." + get_file_type(file_to_clean)

    new_file = open(unique_filename, "w+")
    new_file.close()
    
    cleaned_audio = tfm.build(rec, unique_filename)
     
    file_num+=1
    os.remove(profile_filename)

    return cleaned_audio


# May not need the below function, but keeping it here for now
def convert_to_wav(audio_filepath):
    """If not already a wav file, converts to wav"""
    return



# The third parameter will need to work differently 
def main(model_file, student_file, location_to_store_output):

    """
    @param model_file: audio file of model speaker
    @param student_file: audio file of student attempt
    @param location to store output: a WAV FILE to put the new recordings into
    """
    file_num = 0 

    clean_audio(student_file, location_to_store_output, "model", file_num)

    model_final = clean_audio(model_file, location_to_store_output, "student", file_num)


    

    
    
    
 
if __name__=="__main__":
    
    model_file = sys.argv[1]
    student_file = sys.argv[2]
    location_to_store_output = sys.argv[3]
    main(model_file, student_file, location_to_store_output)
    num = 1
    
    
