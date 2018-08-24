CREATE TABLE App (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  AppId varchar(500) NOT NULL DEFAULT 'default' COMMENT 'AppID',
  Name varchar(500) NOT NULL DEFAULT 'default' COMMENT '应用名',
  OrgId varchar(32) NOT NULL DEFAULT 'default' COMMENT '部门Id',
  OrgName varchar(64) NOT NULL DEFAULT 'default' COMMENT '部门名字',
  OwnerName varchar(500) NOT NULL DEFAULT 'default' COMMENT 'ownerName',
  OwnerEmail varchar(500) NOT NULL DEFAULT 'default' COMMENT 'ownerEmail',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='应用表';


CREATE TABLE AppNamespace (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  Name varchar(32) NOT NULL DEFAULT '' COMMENT 'namespace名字，注意，需要全局唯一',
  AppId varchar(32) NOT NULL DEFAULT '' COMMENT 'app id',
  Format varchar(32) NOT NULL DEFAULT 'properties' COMMENT 'namespace的format类型',
  IsPublic bit(1) NOT NULL DEFAULT 0 COMMENT 'namespace是否为公共',
  Comment varchar(64) NOT NULL DEFAULT '' COMMENT '注释',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT '' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='应用namespace定义';


CREATE TABLE Consumer (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  AppId varchar(500) NOT NULL DEFAULT 'default' COMMENT 'AppID',
  Name varchar(500) NOT NULL DEFAULT 'default' COMMENT '应用名',
  OrgId varchar(32) NOT NULL DEFAULT 'default' COMMENT '部门Id',
  OrgName varchar(64) NOT NULL DEFAULT 'default' COMMENT '部门名字',
  OwnerName varchar(500) NOT NULL DEFAULT 'default' COMMENT 'ownerName',
  OwnerEmail varchar(500) NOT NULL DEFAULT 'default' COMMENT 'ownerEmail',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='开放API消费者';



CREATE TABLE ConsumerAudit (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  ConsumerId int(11) unsigned DEFAULT NULL COMMENT 'Consumer Id',
  Uri varchar(1024) NOT NULL DEFAULT '' COMMENT '访问的Uri',
  Method varchar(16) NOT NULL DEFAULT '' COMMENT '访问的Method',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='consumer审计表';



CREATE TABLE ConsumerRole (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  ConsumerId int(11) unsigned DEFAULT NULL COMMENT 'Consumer Id',
  RoleId int(10) unsigned DEFAULT NULL COMMENT 'Role Id',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) DEFAULT '' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='consumer和role的绑定表';


CREATE TABLE ConsumerToken (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  ConsumerId int(11) unsigned DEFAULT NULL COMMENT 'ConsumerId',
  Token varchar(128) NOT NULL DEFAULT '' COMMENT 'token',
  Expires datetime NOT NULL DEFAULT '2099-01-01 00:00:00' COMMENT 'token失效时间',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='consumer token表';


CREATE TABLE Favorite (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  UserId varchar(32) NOT NULL DEFAULT 'default' COMMENT '收藏的用户',
  AppId varchar(500) NOT NULL DEFAULT 'default' COMMENT 'AppID',
  Position int(32) NOT NULL DEFAULT '10000' COMMENT '收藏顺序',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='应用收藏表';


CREATE TABLE Permission (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  PermissionType varchar(32) NOT NULL DEFAULT '' COMMENT '权限类型',
  TargetId varchar(256) NOT NULL DEFAULT '' COMMENT '权限对象类型',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT '' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='permission表';



CREATE TABLE Role (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  RoleName varchar(256) NOT NULL DEFAULT '' COMMENT 'Role name',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='角色表';



CREATE TABLE RolePermission (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  RoleId int(10) unsigned DEFAULT NULL COMMENT 'Role Id',
  PermissionId int(10) unsigned DEFAULT NULL COMMENT 'Permission Id',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) DEFAULT '' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='角色和权限的绑定表';



CREATE TABLE ServerConfig (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  Key varchar(64) NOT NULL DEFAULT 'default' COMMENT '配置项Key',
  Value varchar(2048) NOT NULL DEFAULT 'default' COMMENT '配置项值',
  Comment varchar(1024) DEFAULT '' COMMENT '注释',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) NOT NULL DEFAULT 'default' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='配置服务自身配置';


CREATE TABLE UserRole (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  UserId varchar(128) DEFAULT '' COMMENT '用户身份标识',
  RoleId int(10) unsigned DEFAULT NULL COMMENT 'Role Id',
  IsDeleted bit(1) NOT NULL DEFAULT 0 COMMENT '1: deleted, 0: normal',
  DataChange_CreatedBy varchar(32) DEFAULT '' COMMENT '创建人邮箱前缀',
  DataChange_CreatedTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  DataChange_LastModifiedBy varchar(32) DEFAULT '' COMMENT '最后修改人邮箱前缀',
  DataChange_LastTime timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (Id)
) COMMENT='用户和role的绑定表';



CREATE TABLE Users (
  Id int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  Username varchar(64) NOT NULL DEFAULT 'default' COMMENT '用户名',
  Password varchar(64) NOT NULL DEFAULT 'default' COMMENT '密码',
  Email varchar(64) NOT NULL DEFAULT 'default' COMMENT '邮箱地址',
  Enabled tinyint(4) DEFAULT NULL COMMENT '是否有效',
  PRIMARY KEY (Id)
) COMMENT='用户表';



CREATE TABLE Authorities (
  Id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  Username varchar(50) NOT NULL,
  Authority varchar(50) NOT NULL,
  PRIMARY KEY (Id)
);


INSERT INTO ServerConfig (Key, Value, Comment)
VALUES
('apollo.portal.envs', 'dev', '可支持的环境列表'),
('organizations', '[{"orgId":"FX","orgName":"风控部"},{"orgId":"ZG","orgName":"资管部"},{"orgId":"TG","orgName":"托管部"}]', '部门列表'),
('superAdmin', 'apollo', 'Portal超级管理员'),
('api.readTimeout', '10000', 'http接口read timeout'),
('consumer.token.salt', 'someSalt', 'consumer token salt'),
('admin.createPrivateNamespace.switch', 'false', '是否允许项目管理员创建私有namespace');

INSERT INTO Users (Username, Password, Email, Enabled)
VALUES
  ('apollo', '$2a$10$7r20uS.BQ9uBpf3Baj3uQOZvMVvB1RN3PYoKE94gtz2.WAOuiiwXS', 'apollo@acme.com', 1);

INSERT INTO Authorities (Username, Authority) VALUES ('apollo', 'ROLE_user');
