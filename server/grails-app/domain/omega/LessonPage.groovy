package omega

class LessonPage {

    static constraints = {
        dueDate nullable:true
        rubricGradebook nullable:true
    }

    String name

    int pageOrder

    boolean rubricGrading;

    RubricGradebook rubricGradebook;

    Date dueDate

    LessonPageStatus status = LessonPageStatus.DRAFT

    static belongsTo = [lesson:Lesson]

    static hasMany = [questions:Question]


    LessonPageExtract extract() {

        LessonPageExtract extract = new LessonPageExtract(this);

        return extract;



    }

}
