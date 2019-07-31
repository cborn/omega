package omega

import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest

@Transactional
class QuestionImageUploaderService {

    AmazonS3Service amazonS3Service

    def uploadFeatureImage(MultipartFile req) {

        if(!amazonS3Service.listBucketNames().contains("omegadev"))
        {
            amazonS3Service.createBucket("omegadev");
        }

        String AWS_key = UUID.randomUUID();

        String path = "images/${AWS_key}"
        String s3FileUrl = amazonS3Service.storeMultipartFile("omegadev",path,req);

        return [awsKey:AWS_key,s3FileUrl:s3FileUrl];

    }

    boolean removeImage(String path) {
        boolean result = amazonS3Service.deleteFile("images/${path}");
        if (!result) {
            log.warn 'could not remove file {}', path
        }
        result
    }
}
