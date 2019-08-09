package omega

class Submission {

    Date submitted;

    static hasMany = [responses: QuestionResponse]

    static belongsTo = [term: Term, user: User, page: LessonPage]

    static constraints = {
    }
}
