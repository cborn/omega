package omega

import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest

@Transactional
class AWSUploaderService {

    AmazonS3Service amazonS3Service

    def upload(MultipartFile req, String prefix) {

        if(!amazonS3Service.listBucketNames().contains("omegadev"))
        {
            amazonS3Service.createBucket("omegadev");
        }

        String AWS_key = UUID.randomUUID();

        String path = "${prefix}/${AWS_key}"
        String s3FileUrl = amazonS3Service.storeMultipartFile("omegadev",path,req);

        return [awsKey:AWS_key,s3FileUrl:s3FileUrl];

    }

    boolean remove(String path,String prefix) {
        boolean result = amazonS3Service.deleteFile("${prefix}/${path}");
        if (!result) {
            log.warn 'could not remove file {}', path
        }
        result
    }
}
