package omega

import grails.rest.Resource

class Course {

    static constraints = {
        moodle_master_id nullable: true;
        syllabusId nullable: true;
    }

    String syllabusId;

    String name;

    String moodle_master_id;

    static hasMany = [lessons:Lesson, terms:Term, owners:User]
    static belongsTo = [Term]



}
