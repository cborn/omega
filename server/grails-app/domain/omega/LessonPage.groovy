package omega

class LessonPage {

    static constraints = {

        dueDate nullable:true
    }

    String name;

    Date dueDate;

    static belongsTo = [lesson:Lesson]

    static hasMany = [questions:Question]

}
