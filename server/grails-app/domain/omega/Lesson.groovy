package omega

class Lesson {

    static constraints = {
    }

    def name;

    static belongsTo = [course:Course]

    static hasMany = [pages:LessonPage]





}
