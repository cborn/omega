package omega

/**
 * A PitchAnnotation has one time stamp, one pitch and an intensity field.
 *
 */


import grails.rest.*
import java.util.List;
import java.util.Locale;

class PitchAnnotation {
    /**
     * The time of the annotation in seconds.
     */
    double start;

    /**
     * the pitch of the annotation measured in Hertz.
     */
    double pitch;

    /**
     * The intensity.
     */
    double intensity;


}
