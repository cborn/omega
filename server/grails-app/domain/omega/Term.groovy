package omega

class Term {

    String name;

    boolean current;



    static hasMany = [
            enrollments:Enrollment,
            submissions:Submission
    ]



    static constraints = {
    }
}
