package omega

abstract class Property {

    String awsKey
    String awsUrl
    boolean autoPlay

    static belongsTo = [site:Site]

    static constraints = {
        site nullable: false
    }




}
