package com.ctrip.framework.apollo.portal.service;

import com.ctrip.framework.apollo.common.entity.App;

public interface RoleInitializationService {

  public void initAppRoles(App app);

  public void initNamespaceRoles(String appId, String namespaceName, String operator);

  /**
   * Grant new namespace-level permissions to app-level roles
   */
  public void initAppRoleNamespacePermissions(final String appId, final String namespaceName);
}