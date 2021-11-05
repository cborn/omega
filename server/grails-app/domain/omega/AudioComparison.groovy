package omega

class AudioComparison {

    String model;
    String source;

    double score;

    static hasMany = [dtw_distances: AudioComparisonPoint]

    static constraints = {
    }
}
