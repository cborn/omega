package omega

class Question {

    static constraints = {
        name nullable:true
        description nullable:true
        imagePrompt nullable:true
        imageFeedback nullable:true
        videoFeedback nullable:true
        audioFeedback nullable:true
        audioPrompt nullable:true
        videoPrompt nullable:true
    }

    def beforeDelete() {
        QuestionResponse.where { question == this }.deleteAll();

    }

    static belongsTo = [page:LessonPage]

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

    Map<QuestionPropertyKeys,Object> custom_properties

    def hasFeedback(){
        return imagePrompt != null || imageFeedback != null || videoPrompt != null || videoFeedback != null || audioPrompt != null || audioFeedback != null;
    }

    static mapping = {
        name type: "text"
        description type: "text"
    }


    static final enum QuestionPropertyKeys {


        CORRECT_ANSWER("correct"),
        FEEDBACK_CORRECT("feedback_correct"), // This can be a single string or an array to correspond with each choice.
        FEEDBACK_INCORRECT("feedback_incorrect"), // this can be a single string or an array to correspond with each choice.

        MULTI_CHOICE_OPTIONS('options'),
        IS_MULTI_SELECT("multi"), // Allow the user to pick multiple answers
        MULTI_SELECT_TYPE("multi_select_type"), //  1 = unlimited, 2 = range, 3 = exact (use the max number.)
        MULTI_LIMIT_MIN("multi_limit_min"), // the minimum number to pick
        MULTI_LIMIT_MAX("multi_limit_max"), // the maximum number to pick
        RANDOMISE("random"), // Randomize the order
        STACK("stack"), // Stack them ontop of eachother

        MAX_CHARS("max_chars"),
        RTL_TEXT("rtl_text"),


        MIN("min"), // min number value
        MAX("max"), // max number value

        IMAGES("images"), // for multi image question the images to show.

        START("start"), // could be a number or a date.
        END("end"), // number or a date
        STEP("step"),
        SHOW_LABELS("show_labels"),
        LABEL_START("label_start"),
        LABEL_MIDDLE("label_middle"),
        LABEL_END("label_end"),

        FORMAT("format"), // format to display the date in

        ALPHABETICAL("alphabetical"), // display the dropdown in alphabetical order.

        MULTI_PART("multipart"),
        LENGTH_LIMIT("length_limit"),
        PROMPT_SYNC("prompt_sync"), // play the prompt when the student start recording

        CLOZE_TEXT("cloze_text"), // This is a string which contains the @@ character where an input is required
        CLOZE_PROMPTS("cloze_prompts"); // This is an array of arrays which contains number of prompts e.g. [[],["Bird","Fox","Hare"],[]] - here if the array is empty this means the user should type the answer in the space.


        String key_name;

        QuestionPropertyKeys(String key) {
            this.key_name = key;
        }

    }



}


enum QuestionType {

    MULTI_CHOICE,
    SHORT_TEXT,
    LONG_TEXT,
    BLOCK_TEXT,
    PICTURE_CHOICE,
    BOOLEAN,
    SCALE,
    DATE,
    NUMBER,
    DROPDOWN,
    VOICE,
    CLOZE


}