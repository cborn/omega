package omega

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic
import org.springframework.security.core.GrantedAuthority

@GrailsCompileStatic
@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Role implements GrantedAuthority, Serializable {

	private static final long serialVersionUID = 1

	String authority

	static constraints = {
		authority nullable: false, blank: false, unique: true
	}

	static getStudentRole() {
		return Role.findByAuthority("ROLE_STUDENT")
	}

	static mapping = {
		cache true
		table '`role`'
	}
}
