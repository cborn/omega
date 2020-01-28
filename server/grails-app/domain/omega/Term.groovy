package omega

class Term {

    String name

    boolean current

    static hasMany = [
            enrollments:Enrollment,
            submissions:Submission,
            courses:Course
        ]

    static belongsTo = [site:Site]


    static constraints = {
    }
}
