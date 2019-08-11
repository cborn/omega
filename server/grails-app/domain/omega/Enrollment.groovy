package omega

class Enrollment {


    static hasOne = [course:Course, term:Term, user:User]

    static constraints = {
    }
}
