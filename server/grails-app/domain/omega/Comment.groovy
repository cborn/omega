package omega

class Comment {


    String comment_text;

    User user;

    Integer location;

    String voice_clip;

    Date submitted;

    static constraints = {
        location nullable:true
        voice_clip nullable: true
    }
}
