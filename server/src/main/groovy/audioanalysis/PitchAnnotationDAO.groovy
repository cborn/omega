package audioanalysis

import omega.PitchAnnotation

/**
 * A PitchAnnotation has one time stamp, one pitch and an optional probability field,
 * which can be used to represent another stored value related to pitch.
 *
 * Modification of Annotation code by @author Joren Six
 */


 class PitchAnnotationDAO {

    /**
     * The time of the annotation in seconds.
     */
    private double start;

    /**
     * the pitch of the annotation measured in Hertz.
     */
    private double pitchInHz;

    /**
     * The probability or salience. A value between zero and one (inclusive).
     */
    private double probability;

    /**
     * Create a new annotation with the given data.
     * @param timeStamp
     *            The starting time (in seconds).
     * @param pitchInHz
     *            The pitch in Hz.
     * @param salience
     *            A probability between zero and one (inclusive) defining the
     *            salience of the pitch.
     */
    PitchAnnotationDAO(final double timeStamp, final double pitchInHz, final double salience) {
        // sanity check
//        if (salience > 1.0 || 0.0 > salience) {
//            throw new IllegalArgumentException(
//                    "The salience should be a value between zero and one (inclusive): " + salience)
//        }
//        if (pitchInHz <= 0) {
//            throw new IllegalArgumentException("The pitch in Hz should be a value above zero, it is: "
//                    + pitchInHz)
//        }
//        if (timeStamp < 0) {
//            throw new IllegalArgumentException(
//                    "The timestamp in seconds should be equal or above zero, it is: " + timeStamp)
//        }

        // Initialize members.
        this.start = timeStamp
        this.probability = salience
        this.pitchInHz = pitchInHz

    }

    /**
     * Create a new annotation with the given data. The default salience of 1.0 is used.
     * @param timeStamp
     *            The starting time (in seconds).
     * @param pitchInHz
     *            The pitch in Hz.
     */
    PitchAnnotationDAO(final double timeStamp, final double pitchInHz) {
        this(timeStamp, pitchInHz, 1.0);
    }

    /**
     * Returns the starting time in seconds.
     *
     * @return The starting time of the sample (in seconds).
     */
     double getStart() {
        return this.start
    }

    /**
     * The probability for the annotation. If the algorithm does not define a
     * probability the default is 1.0.
     *
     * @return The probability or salience for the annotation (a value between 0
     *         and 1).
     */
     double getProbability() {
        return this.probability
    }

    /**
     * Return the pitch in Hertz.
     */
     double getPitch() {
        return this.pitchInHz
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#hashCode()
     */

    @Override
     int hashCode() {
        return Double.valueOf(start).hashCode() + getSource().hashCode();
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#toString()
     */

    @Override
     String toString() {
        return String.format(Locale.US, "%.5f,%.5f,%.5f", start, getPitch(), probability);
    }

    /**
     * Parses an annotation as written by the toString() method.
     *
     * @param line
     *            The line to parse.
     * @return A new annotation.
     */
    static PitchAnnotation parse(final String line) {
        final String[] data = line.split(",");
        final double timeStamp = Double.parseDouble(data[0]);
        final double pitch = Double.parseDouble(data[1]);
        final double probability = Double.parseDouble(data[2]);
        return new PitchAnnotation(timeStamp, pitch, probability);
    }

}
