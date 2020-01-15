package omega

import grails.gorm.transactions.Transactional
import org.springframework.web.util.UriUtils

import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import java.security.SecureRandom

@Transactional
class LTIService {


    enum PASSBACK_ROLES{
        SUPERADMIN,
        ADMIN,
        FACULTY,
        GRADER,
        STUDENT
    }

    public static SecureRandom secRan = new SecureRandom()

    public static void createMoodleUser (Site site, Map parameters) {
        byte[] bytes = new byte[40];
        secRan.nextBytes(bytes)
        String salt = bytes.toString();
        String pw = generateMoodlePassword(parameters.get("lis_person_contact_email_primary"), parameters.get("lis_person_name_full"), salt)

        def roles = decideUserRole(parameters.get("roles"))

        def user = new User(site: site, username: parameters.get("lis_person_contact_email_primary"), password:pw, fromMoodle:true, firstname: parameters.get("lis_person_name_given"), surname: parameters.get("lis_person_name_family"), enabled: 'true', salt: salt).save(failOnError:true)

        if(roles.contains(PASSBACK_ROLES.STUDENT)) {
            UserRole.create user, Role.findByAuthority('ROLE_STUDENT')
        }
        if(roles.contains(PASSBACK_ROLES.FACULTY)) {
            UserRole.create user, Role.findByAuthority('ROLE_FACULTY');
        }
        if(roles.contains(PASSBACK_ROLES.GRADER)) {
            UserRole.create user, Role.findByAuthority('ROLE_GRADER');
        }
        if(roles.contains(PASSBACK_ROLES.ADMIN)) {
            UserRole.create user, Role.findByAuthority('ROLE_ADMIN');
        }

        UserRole.withSession {
            it.flush()
            it.clear()
        }

        user.save(flush:true)

    }

    public static String generateMoodlePassword(String email, String name, String salt) {
        String pwString = email + name + salt
        Integer hash = new Integer(pwString.hashCode())

        return hash.toString()
    }

    public static PASSBACK_ROLES[] decideUserRole(String roleListStr) {

        String[] roleList = roleListStr.split(",");
        ArrayList<String> SysRole = new ArrayList<String>();
        ArrayList<String> InstRole = new ArrayList<String>();
        ArrayList<String> ConRole = new ArrayList<String>();

        for(String role: roleList) {
            if(role.startsWith("urn:lti:sysrole:ims/lis/")) {
                SysRole.add(role.substring(24));
            }
            else if(role.startsWith("urn:lti:instrole:ims/lis/")) {
                InstRole.add(role.substring(25));
            }
            else {
                ConRole.add(role);
            }
        }

        def roles = [];


        if(ConRole.indexOf("Learner") > -1) {
            roles.push(PASSBACK_ROLES.STUDENT);
        }

        if(ConRole.indexOf("Instructor") > -1) {
            roles.push(PASSBACK_ROLES.FACULTY)
        }

        if (ConRole.indexOf("Grader") > -1 || ConRole.indexOf("grader") > -1) {
            roles.push(PASSBACK_ROLES.GRADER)
        }

        if(SysRole.indexOf("Administrator") > -1) {
            roles.push(PASSBACK_ROLES.ADMIN)
        }


        if(roles.size() == 0) {
            throw new MissingPropertyException("User Type")
        }

        return roles;

    }


/**
 * Utility to create OAuth 1 authorization headers.
 *
 * Edited version of code found here:
 * https://gist.github.com/kyrielia/e1e76290416a4faf5f6f
 * @author Kyriacos Elia
 */

    public static String generateOAuthSignature(String method, String url, String consumerSecret, Map parameters) {

        TreeMap<String,String> encodeParams = new TreeMap<String,String>();

        // Each key and value needs to be encoded before being sorted and concatanated
        for(String key: parameters.keySet()) {
            if(!key.equals("oauth_signature")) {
                encodeParams.put(encode(key), encode(parameters.get(key)));
            }
        }

        // Sort oAuth params alphabetically
        def sortedParameters = encodeParams.sort { it.key }

        def signatureParameters = ''
        sortedParameters.each {
            signatureParameters += "${it.key}=${it.value}&"
        }

        // Remove trailing ampersand left from loop
        signatureParameters = signatureParameters.substring(0, signatureParameters.length() - 1)

        def baseString = "${method}&${encode(url)}&${encode(signatureParameters)}"
        // Generate HMAC-SHA1
        def keySpec = new SecretKeySpec((consumerSecret + '&').bytes, 'HmacSHA1')
        def mac = Mac.getInstance('HmacSHA1');
        mac.init(keySpec)
        def calculatedBytes = mac.doFinal(baseString.getBytes('UTF-8'))

        // Base64 encode the HMAC
        return new String(Base64.encoder.encode(calculatedBytes))
    }

    private static String encode(String stringToEncode) {
        String encodeStr = UriUtils.encode(stringToEncode, "UTF-8");
        encodeStr.replaceAll('%7E', '~');
        encodeStr.replaceAll('\\+', ' ');

        return encodeStr
    }
}
