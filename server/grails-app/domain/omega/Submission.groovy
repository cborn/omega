package omega

import javax.xml.ws.Response

class Submission {

    Date drafted;

    Date submitted;

    Date graded;

    SubmissionStatus status = SubmissionStatus.DRAFT;

    Integer grade;


    Optional<String> verifyCompleteness() {

        if (this.page == null)
            return Optional.of("Page data not found");

        for (Question question : this.page.questions) {
            QuestionResponse response = QuestionResponse.findByQuestionAndSubmission(question, this);

            if (question.isRequired() && (response == null || response.response == null || response.response == "")) {
                return Optional.of("Question (" + (question.position + 1) + ") " + question.name + " requires an answer.");
            }

            Optional<String> validationResponse = QuestionValidator.validate(response, question);

            if (validationResponse.isPresent()) {
                return validationResponse;
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
