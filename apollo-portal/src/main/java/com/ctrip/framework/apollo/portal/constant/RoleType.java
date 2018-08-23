package com.ctrip.framework.apollo.portal.constant;

public class RoleType {

  public static final String MASTER = "Master";

  /**
   * 运维人员角色（拥有App下所有命名空间修改配置的值的权限）
   */
  public static final String IMPLEMENTATION = "Implementation";

  public static final String MODIFY_NAMESPACE = "ModifyNamespace";

  public static final String RELEASE_NAMESPACE = "ReleaseNamespace";

  public static boolean isValidRoleType(String roleType) {
    return MASTER.equals(roleType) || MODIFY_NAMESPACE.equals(roleType)
        || RELEASE_NAMESPACE.equals(roleType) || IMPLEMENTATION.equals(roleType);
  }

}
