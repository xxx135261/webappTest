app_module.config(appValdr);
setting_module.config(appValdr);

function appValdr(valdrProvider) {
    valdrProvider.addConstraints({
                                     'App': {
                                         'appId': {
                                             'size': {
                                                 'max': 32,
                                                 'message': 'AppId长度不能多于32个字符'
                                             }
                                         },
                                         'appName': {
                                             'size': {
                                                 'max': 128,
                                                 'message': '应用名称长度不能多于128个字符'
                                             },
                                             'required': {
                                                 'message': '应用名称不能为空'
                                             }
                                         }
                                     }
                                 })
}

cluster_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'Cluster': {
                                         'clusterName': {
                                             'size': {
                                                 'max': 32,
                                                 'message': '集群名称长度不能多于32个字符'
                                             },
                                             'required': {
                                                 'message': '集群名称不能为空'
                                             }
                                         }
                                     }
                                 })
});

namespace_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'AppNamespace': {
                                         'namespaceName': {
                                             'size': {
                                                 'max': 32,
                                                 'message': 'Namespace名称长度不能多于32个字符'
                                             },
                                             'required': {
                                                 'message': 'Namespace名称不能为空'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': '备注长度不能多于64个字符'
                                             }
                                         }
                                     }
                                 })
});

application_module.config(function (valdrProvider) {
    valdrProvider.addConstraints({
                                     'Item': {
                                         'key': {
                                             'size': {
                                                 'max': 128,
                                                 'message': 'Key长度不能多于128个字符'
                                             },
                                             'required': {
                                                 'message': 'Key不能为空'
                                             }
                                         }, 
                                         'value': {
                                             'required': {
                                                 'message': 'value不能为空'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': '备注长度不能多于64个字符'
                                             }
                                         },
                                         'driver': {
                                             'required': {
                                                 'message': 'Driver不能为空'
                                             }
                                         },
                                         'username': {
                                             'required': {
                                                 'message': 'Username不能为空'
                                             }
                                         },
                                         'password': {
                                             'required': {
                                                 'message': 'Password不能为空'
                                             }
                                         },
                                         'cachePassword': {
                                             'required': {
                                                 'message': 'Password不能为空'
                                             }
                                         },
                                         'cachePort': {
                                             'required': {
                                                 'message': 'Port不能为空'
                                             }
                                         }
                                     },
                                     'Release': {
                                         'releaseName': {
                                             'size': {
                                                 'max': 64,
                                                 'message': 'Release Name长度不能多于64个字符'
                                             },
                                             'required': {
                                                 'message': 'Release Name不能为空'
                                             }
                                         },
                                         'comment': {
                                             'size': {
                                                 'max': 64,
                                                 'message': '备注长度不能多于64个字符'
                                             }
                                         }
                                     }
                                 })
});


