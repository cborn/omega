package omega


import grails.rest.*

class PraatPitchAnnotation {
    static hasMany = [pitchAnnotations:PitchAnnotation]
}
