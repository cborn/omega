package omega

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic
import org.springframework.security.core.userdetails.UserDetails

@GrailsCompileStatic
@EqualsAndHashCode(includes = 'username')
@ToString(includes = 'username', includeNames = true, includePackage = false)
class User implements UserDetails, Serializable {

    private static final long serialVersionUID = 1

    String username
    String password
    String firstname;
    String surname;
    String salt;
    String otp;
    boolean fromMoodle;
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired

    Set<Role> getAuthorities() {
        (UserRole.findAllByUser(this) as List<UserRole>)*.role as Set<Role>
    }

    @Override
    boolean isAccountNonExpired() {
        return !accountExpired;
    }

    @Override
    boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    boolean isCredentialsNonExpired() {
        return !password;
    }

    def isStudent() {
        return (this.getAuthorities().find {
            it.authority == "ROLE_STUDENT"
        });
    }

    def isGrader() {
        return (this.getAuthorities().find {
            it.authority == "ROLE_GRADER"
        });
    }

    def isAdmin() {
        return (this.getAuthorities().find {
            it.authority == "ROLE_ADMIN"
        });
    }

    def isSuperAdmin() {
        return (this.getAuthorities().find {
            it.authority == "ROLE_SUPER_ADMIN"
        });
    }

    def isAdminOrSuperAdmin() {
       this.isAdmin() || this.isSuperAdmin();
    }


    def isFaculty() {
        return (this.getAuthorities().find {
            it.authority == "ROLE_FACULTY"
        });
    }


    static hasMany = [enrollments: Enrollment]

    static constraints = {
        password nullable: false, blank: false, password: true
        username nullable: false, blank: false, unique: true
        salt nullable: true
        otp nullable: true
    }

    static mapping = {
        password column: '`password`'
        table '`user`'
    }
}
