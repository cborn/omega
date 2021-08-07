package omega

class QuestionResponse {


    String response

    Question question

    String grade

    QuestionStatus status = QuestionStatus.AWAITING_REVIEW

    static hasMany = [comments:Comment]

    static belongsTo = [submission:Submission]


    static constraints = {
        grade nullable:true
        response nullable: true
        status defaultValue: QuestionStatus.AWAITING_REVIEW
    }

    static mapping = {
        response type: 'text'
    }
}
