package omega

class Term {

    String name;

    boolean current;



    static hasMany = [
            courses:Course,
            submissions:Submission
    ]



    static constraints = {
    }
}
