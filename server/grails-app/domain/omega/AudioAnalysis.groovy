
package omega


import grails.rest.*

class AudioAnalysis {

  String filepath

  static hasMany = [praatPitchAnnotations:PraatPitchAnnotation]

  static constraints = {
    filepath blank:false
    praatPitchAnnotations blank:true
  }

}
