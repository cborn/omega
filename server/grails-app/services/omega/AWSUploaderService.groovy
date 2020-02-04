package omega

import grails.gorm.transactions.Transactional
import grails.plugin.awssdk.s3.AmazonS3Service
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest

@Transactional
class AWSUploaderService {

    AmazonS3Service amazonS3Service

    def upload(MultipartFile req, String prefix) {
        return upload(req, prefix, null)
    }

    def upload(MultipartFile req, String prefix, Site site) {

        String bucket = System.getenv("LL_AWS_BUCKET_NAME")

        if (site) {
            bucket = site.awsBucketName
        }

        if (!bucket)
            bucket = "omegadev"

//        if(!amazonS3Service.listBucketNames().contains(bucket))
//        {
//            amazonS3Service.createBucket(bucket);
//        }

        String AWS_key = UUID.randomUUID()

        String path = "${prefix}/${AWS_key}"
        String s3FileUrl = amazonS3Service.storeMultipartFile(bucket, path, req)

        return [awsKey: AWS_key, s3FileUrl: s3FileUrl]

    }

    def download(String key) {
        return download(key, null)
    }


    def download(String key, Site site) {

        String bucket = System.getenv("LL_AWS_BUCKET_NAME")

        if (site) {
            bucket = site.awsBucketName
        }
        File file = amazonS3Service.getFile(bucket, 'audio/' + key, File.createTempFile(key, '').getAbsolutePath())

        return file

    }

    boolean remove(String path, String prefix) {
        return remove(path, prefix, null)
    }

    boolean remove(String path, String prefix, Site site) {
        String bucket = System.getenv("LL_AWS_BUCKET_NAME")

        if (site) {
            bucket = site.awsBucketName
        }

        boolean result = amazonS3Service.deleteFile(bucket, "${prefix}/${path}")
        if (!result) {
            log.warn 'could not remove file {}', path
        }
        result
    }
}
