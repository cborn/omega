package omega;

import java.util.Date;
import java.util.List;
import java.util.Map;

class QuestionExtract {


    QuestionExtract(Question question) {

        this.type = question.type;
        this.position = question.position;
        this.audioFeedback = question.audioFeedback;
        this.required = question.required;
        this.audioPrompt = question.audioPrompt;
        this.description = question.description;
        this.name = question.name;
        this.imageFeedback = question.imageFeedback;
        this.imagePrompt  = question.imagePrompt;
        this.videoFeedback = question.videoFeedback;
        this.videoPrompt = question.videoPrompt;
        this.max_grade = question.max_grade;
        this.custom_properties = question.custom_properties;

    }


    QuestionType type;

    int position;

    boolean required = false;

    String description;

    String name;

    ImageProperty imagePrompt;

    ImageProperty imageFeedback;

    VideoProperty videoPrompt;

    VideoProperty videoFeedback;

    AudioProperty audioPrompt;

    AudioProperty audioFeedback;

    int max_grade;

    Map<Question.QuestionPropertyKeys,Object> custom_properties;


}
