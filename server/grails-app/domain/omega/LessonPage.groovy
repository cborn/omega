package omega

class LessonPage {

    static constraints = {
        dueDate nullable:true
    }

    String name;

    int pageOrder;

    Date dueDate;

    static belongsTo = [lesson:Lesson]

    static hasMany = [questions:Question]

}
