package omega

import agorapulse.libs.awssdk.util.AwsClientUtil
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.RegionUtils
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
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

        AWSStaticCredentialsProvider credentials = new AWSStaticCredentialsProvider(new BasicAWSCredentials(site.awsAccessKey, site.awsSecretKey))
        amazonS3Service.client = AmazonS3ClientBuilder.standard()
                .withRegion(site.awsBucketRegion)
                .withCredentials(credentials)
                .build()

        String s3FileUrl = amazonS3Service.storeMultipartFile(bucket, path, req)

        return [awsKey: AWS_key, s3FileUrl: s3FileUrl]

    }

    def uploadWithKey(File req, String prefix, Site site, String AWS_key) {

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

        String path = "${prefix}/${AWS_key}"

        AWSStaticCredentialsProvider credentials = new AWSStaticCredentialsProvider(new BasicAWSCredentials(site.awsAccessKey, site.awsSecretKey))
        amazonS3Service.client = AmazonS3ClientBuilder.standard()
                .withRegion(site.awsBucketRegion)
                .withCredentials(credentials)
                .build()

        String s3FileUrl = amazonS3Service.storeFile(bucket, path, req)

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

        AWSStaticCredentialsProvider credentials = new AWSStaticCredentialsProvider(new BasicAWSCredentials(site.awsAccessKey, site.awsSecretKey))
        amazonS3Service.client = AmazonS3ClientBuilder.standard()
                .withRegion(site.awsBucketRegion)
                .withCredentials(credentials)
                .build()

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

        AWSStaticCredentialsProvider credentials = new AWSStaticCredentialsProvider(new BasicAWSCredentials(site.awsAccessKey, site.awsSecretKey))
        amazonS3Service.client = AmazonS3ClientBuilder.standard()
                .withRegion(site.awsBucketRegion)
                .withCredentials(credentials)
                .build()

        boolean result = amazonS3Service.deleteFile(bucket, "${prefix}/${path}")
        if (!result) {
            log.warn 'could not remove file {}', path
        }
        result
    }
}
