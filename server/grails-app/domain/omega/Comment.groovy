package omega

class Comment {


    String comment_text

    User user

    Double location

    Double endLocation

    String voice_clip

    Date submitted

    static constraints = {
        location nullable:true
        endLocation nullable: true
        voice_clip nullable: true
        comment_text nullable: true
    }
}
