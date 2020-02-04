package omega

import grails.rest.Resource

class Course {

    static constraints = {
        moodle_master_id nullable: true
    }

    String name

    String moodle_master_id

    static hasMany = [lessons:Lesson, enrollments:Enrollment, owners:User]
    static belongsTo = [term:Term]



}
