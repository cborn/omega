package omega

class Course {

    static constraints = {
    }


    def name;

    def moodle_master_id;

    static hasMany = [lessons:Lesson]



}
