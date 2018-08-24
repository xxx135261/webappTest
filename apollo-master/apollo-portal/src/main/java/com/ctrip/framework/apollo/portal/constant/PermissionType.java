package com.ctrip.framework.apollo.portal.constant;

public interface PermissionType {

  /**
   * APP level permission
   */

  String CREATE_NAMESPACE = "CreateNamespace";

  String CREATE_CLUSTER = "CreateCluster";

  /**
   * 分配用户权限的权限
   */
  String ASSIGN_ROLE = "AssignRole";

  /**
   * namespace level permission
   */

  String MODIFY_NAMESPACE = "ModifyNamespace";

  /**
   * 增减命名空间配置的权限
   */
  String ADD_DEL_NAMESPACE = "AddOrDelNamespace";

  /**
   * 修改命名空间下配置的值的权限
   */
  String MODIFY_VAL_NAMESPACE = "ModifyValNamespace";

  String RELEASE_NAMESPACE = "ReleaseNamespace";


}
