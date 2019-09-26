package omega

class Enrollment {

    int grade;

    static hasOne = [lesson:Lesson, term:Term, user:User]

    static constraints = {
    }
}
