package omega

class Site {


    String name

    String awsSecretKey

    String awsAccessKey

    String awsBucketRegion

    String awsBucketName

    String moodleUrl

    String moodleKey

    String getAwsUrl(prefix) {

        return "https://s3-"+awsBucketRegion+".amazonaws.com/"+awsBucketName+"/"+ prefix;

    }


    static constraints = {
    }


}
