/*
 * 软件版权: 恒生电子股份有限公司
 * 修改记录:
 * 修改日期     修改人员  修改说明
 * ========    =======  ============================================
 * 2018/8/3  rencc19758  新增
 * ========    =======  ============================================
 */
package com.ctrip.framework.apollo.portal.spi.hs;

import com.ctrip.framework.apollo.common.entity.App;
import com.ctrip.framework.apollo.core.ConfigConsts;
import com.ctrip.framework.apollo.portal.constant.PermissionType;
import com.ctrip.framework.apollo.portal.constant.RoleType;
import com.ctrip.framework.apollo.portal.entity.po.Permission;
import com.ctrip.framework.apollo.portal.entity.po.Role;
import com.ctrip.framework.apollo.portal.spi.defaultimpl.DefaultRoleInitializationService;
import com.ctrip.framework.apollo.portal.util.RoleUtils;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * 功能说明:
 * 开发人员: rencc19758 rencc19758@hundsun.com <br>
 * 开发时间: 2018/8/3 <br>
 * 功能描述: 写明作用，调用方式，使用场景，以及特殊情况<br>
 */
public class HsRoleInitializationService extends DefaultRoleInitializationService {
  private static final Logger LOGGER = LoggerFactory.getLogger(HsRoleInitializationService.class);

  @Override
  @Transactional
  public void initAppRoles(App app) {
    String appId = app.getAppId();

    String appMasterRoleName = RoleUtils.buildAppMasterRoleName(appId);

    //has created before
    if (rolePermissionService.findRoleByRoleName(appMasterRoleName) != null) {
      return;
    }
    String operator = app.getDataChangeCreatedBy();
    //create app permissions
    createAppMasterRole(appId, operator);

    //assign master role to user
    rolePermissionService
        .assignRoleToUsers(RoleUtils.buildAppMasterRoleName(appId), Sets.newHashSet(app.getOwnerName()),
            operator);

    initNamespaceRoles(appId, ConfigConsts.NAMESPACE_APPLICATION, operator);
    createAppImplRole(appId, operator);

    //assign modify、release namespace role to user
    rolePermissionService.assignRoleToUsers(
        RoleUtils.buildNamespaceRoleName(appId, ConfigConsts.NAMESPACE_APPLICATION, RoleType.MODIFY_NAMESPACE),
        Sets.newHashSet(operator), operator);
    rolePermissionService.assignRoleToUsers(
        RoleUtils.buildNamespaceRoleName(appId, ConfigConsts.NAMESPACE_APPLICATION, RoleType.RELEASE_NAMESPACE),
        Sets.newHashSet(operator), operator);

  }

  @Override
  @Transactional
  public void initNamespaceRoles(final String appId, final String namespaceName, final String operator) {
    /**
     * @See RoleType.MODIFY_NAMESPACE
     */
    String modifyNamespaceRoleName = RoleUtils.buildModifyNamespaceRoleName(appId, namespaceName);
    if (rolePermissionService.findRoleByRoleName(modifyNamespaceRoleName) == null) {
      Set<Permission> namespacePermissions =
          FluentIterable.from(Lists.newArrayList(
              PermissionType.ADD_DEL_NAMESPACE, PermissionType.MODIFY_VAL_NAMESPACE
          ))
              .transform(permissionType -> createPermission(RoleUtils.buildNamespaceTargetId(appId, namespaceName), permissionType, operator)).toSet();
      Set<Permission> createdNamespacePermissions = rolePermissionService.createPermissions(namespacePermissions);
      Set<Long>
          namespacePermissionIds =
          FluentIterable.from(createdNamespacePermissions).transform(permission -> permission.getId()).toSet();

      Role modifyNamespaceRole = createRole(RoleUtils.buildModifyNamespaceRoleName(appId, namespaceName), operator);

      rolePermissionService.createRoleWithPermissions(modifyNamespaceRole, namespacePermissionIds);
    }

    /**
     * @See RoleType.RELEASE_NAMESPACE
     */
    String releaseNamespaceRoleName = RoleUtils.buildReleaseNamespaceRoleName(appId, namespaceName);
    if (rolePermissionService.findRoleByRoleName(releaseNamespaceRoleName) == null) {
      createNamespaceRole(appId, namespaceName, PermissionType.RELEASE_NAMESPACE,
          RoleUtils.buildReleaseNamespaceRoleName(appId, namespaceName), operator);
    }
  }

  @Override
  @Transactional
  public void initAppRoleNamespacePermissions(final String appId, final String namespaceName) {
    List<Permission> permissions = rolePermissionService.findByPermissionTypeInAndTargetId(
        Sets.newHashSet(PermissionType.MODIFY_VAL_NAMESPACE, PermissionType.RELEASE_NAMESPACE), RoleUtils.buildNamespaceTargetId(appId, namespaceName)
    );
    Role appImplRole = rolePermissionService.findRoleByRoleName(RoleUtils.buildAppRoleName(appId, RoleType.IMPLEMENTATION));
    Set<Long> permissionIds = FluentIterable.from(permissions).transform(permission -> permission.getId()).toSet();
    rolePermissionService.createRolePermissions(appImplRole, permissionIds);
  }

  private void createAppImplRole(final String appId, final String operator) {
    Role appImplRole = createRole(RoleUtils.buildAppRoleName(appId, RoleType.IMPLEMENTATION), operator);

    List<Permission> permissions = rolePermissionService.findByPermissionTypeInAndTargetId(
        Sets.newHashSet(PermissionType.MODIFY_VAL_NAMESPACE, PermissionType.RELEASE_NAMESPACE), RoleUtils.buildDefaultNamespaceTargetId(appId)
    );
    if (!permissions.isEmpty()) {
      Set<Long> permissionIds = FluentIterable.from(permissions)
          .transform(permission -> permission.getId()).toSet();
      rolePermissionService.createRoleWithPermissions(appImplRole, permissionIds);
    } else {
      LOGGER.warn("createAppImplRole failed");
    }
  }
}