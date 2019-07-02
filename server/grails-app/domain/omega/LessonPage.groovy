package omega

class LessonPage {

    static constraints = {

        dueDate nullable:true
    }

    def name;

    def dueDate;

    static belongsTo = [lesson:Lesson]

    static hasMany = [questions:Question]

}
