package omega;

import java.util.Date;
import java.util.List;
import java.util.Map;

class QuestionExtract {


    QuestionExtract(Question question) {

        this.type = question.type;
        this.position = question.position;
        this.audioFeedback = question.audioFeedback != null ? new PropertyExtract(question.audioFeedback) : null;
        this.required = question.required;
        this.audioPrompt = question.audioPrompt != null ?new PropertyExtract(question.audioPrompt) : null;
        this.description = question.description;
        this.name = question.name;
        this.imageFeedback = question.imageFeedback != null ?new PropertyExtract(question.imageFeedback) : null;
        this.imagePrompt  = question.imagePrompt != null ?new PropertyExtract(question.imagePrompt) : null;
        this.videoFeedback = question.videoFeedback != null ?new PropertyExtract(question.videoFeedback) : null;
        this.videoPrompt = question.videoPrompt != null ?new PropertyExtract(question.videoPrompt) : null;
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
