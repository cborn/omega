package omega

class Submission {

    Date drafted;

    Date submitted;

    Date graded;

    SubmissionStatus status = SubmissionStatus.DRAFT;

    Integer grade;

    static hasMany = [responses: QuestionResponse]

    static belongsTo = [term: Term, user: User, page: LessonPage]

    static constraints = {
        submitted nullable: true
        graded nullable: true
        grade nullable: true
    }
}
