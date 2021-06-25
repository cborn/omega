package omega;

import java.util.Date;
import java.util.List;
import java.util.Map;

class QuestionExtract {


    QuestionExtract(Question question) {

        this.type = question.type;
        this.position = question.position;
        this.audioFeedback = new PropertyExtract(question.audioFeedback);
        this.required = question.required;
        this.audioPrompt = new PropertyExtract(question.audioPrompt);
        this.description = question.description;
        this.name = question.name;
        this.imageFeedback = new PropertyExtract(question.imageFeedback);
        this.imagePrompt  = new PropertyExtract(question.imagePrompt);
        this.videoFeedback = new PropertyExtract(question.videoFeedback);
        this.videoPrompt = new PropertyExtract(question.videoPrompt);
        this.max_grade = question.max_grade;
        this.custom_properties = question.custom_properties;

    }


    QuestionType type;

    int position;

    boolean required = false;

    String description;

    String name;

    PropertyExtract imagePrompt;

    PropertyExtract imageFeedback;

    PropertyExtract videoPrompt;

    PropertyExtract videoFeedback;

    PropertyExtract audioPrompt;

    PropertyExtract audioFeedback;

    int max_grade;

    Map<Question.QuestionPropertyKeys,Object> custom_properties;


}
