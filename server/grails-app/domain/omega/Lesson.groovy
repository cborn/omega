package omega

class Lesson {

    static constraints = {
        name(unique: ['course'])
        due nullable: true
    }

    Date due

    String name

    static belongsTo = [course:Course]

    static hasMany = [pages:LessonPage, enrollment:Enrollment]







}
