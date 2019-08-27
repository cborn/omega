package omega

import javax.xml.ws.Response

class Submission {

    Date drafted;

    Date submitted;

    Date graded;

    SubmissionStatus status = SubmissionStatus.DRAFT;

    Integer grade;


    Optional<String> verifyCompleteness(){

        for(Question question : this.page.questions)
        {
            QuestionResponse response = QuestionResponse.findByQuestionAndSubmission(question,this);

            if(question.isRequired() && response == null)
            {
                return Optional.of("Question ("+question.position+1+") "+question.name+" requires an answer.");
            }
        }


        return Optional.empty();
    }


    static hasMany = [responses: QuestionResponse]

    static belongsTo = [term: Term, user: User, page: LessonPage]

    static constraints = {
        submitted nullable: true
        graded nullable: true
        grade nullable: true
    }
}
