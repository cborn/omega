package omega

class Lesson {

    static constraints = {
    }

    String name;

    static belongsTo = [course:Course]

    static hasMany = [pages:LessonPage]





}
