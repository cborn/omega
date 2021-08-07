package omega

class PropertyExtract {

    String awsKey
    String awsUrl
    boolean autoPlay
    boolean isNull;


    PropertyExtract(Property property) {
        if(property != null) {
            this.awsKey = property.awsKey;
            this.awsUrl = property.awsUrl;
            this.autoPlay = property.autoPlay;
            this.isNull = false;
        }
        else
        {
            this.isNull = true
        }
    }


}
