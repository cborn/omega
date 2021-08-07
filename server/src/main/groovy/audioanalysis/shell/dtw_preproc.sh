#!/bin/bash

#removes noise, removes silences at the beginning and end
#Parameters: model_file student_file location_to_store_output
i=0
echo "started the bash script"
cd $3 

for fullfile in $1 $2
do
	i=$(echo $i+1 | bc -l) #for duration

        filename=`basename $fullfile`
        filename="${filename%%.*}"
	
	#pull out filenames
	ext="${fullfile#*.}"

	if [ $ext != "wav" ]; then
		ffmpeg -y -i "$fullfile" "$filename.wav"
        else
            cp $fullfile .
	fi
	fullfile="$filename.wav"

	#get noise profile and remove noise
	sox $fullfile -n noiseprof "$filename.prof"
	sox $fullfile "nonoise_$fullfile" noisered "$filename.prof" 0.21

	#remove silence at the beginning and end
	ffmpeg -i nonoise_$fullfile -af silenceremove=1:0:-50dB nobeg_$fullfile

	sox nobeg_$fullfile temp1_$fullfile reverse
	sox temp1_$fullfile temp2_$fullfile silence 1 0.1 -50d
	sox temp2_$fullfile final_$fullfile reverse

done

#rename the two final files to model_final.wav and student_final.wav
m=`basename $1`
m="${m%%.*}"
mv final_$m.wav model_$4_final.wav

s=`basename $2`
s="${s%%.*}"
mv final_$s.wav student_$4_final.wav

#remove all temp files except the two final files
shopt -s extglob
rm -v !("model_$4_final.wav"|"student_$4_final.wav")

echo "finished"
exit 0