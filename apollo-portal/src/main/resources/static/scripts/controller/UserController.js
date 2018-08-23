user_module.controller('UserController',
                      ['$scope', '$window', 'toastr', 'AppUtil', 'UserService',
                       UserController]);

function UserController($scope, $window, toastr, AppUtil, UserService) {

    $scope.user = {};
    $scope.users = [{}];
    $scope.appForm_show = false;
    $scope.userList_show = true;

    $scope.createOrUpdateUser = function () {
        UserService.createOrUpdateUser($scope.user).then(function (result) {
            $scope.findUsers();
            toastr.success("创建/修改用户成功");
        }, function (result) {
            AppUtil.showErrorMsg(result, "创建用户失败");
        })

    }

    $scope.findUsers = function () {
        UserService.find_all_users().then(function (result) {
            $scope.users = result;
            toastr.success("获取成功");
        }, function (result) {
            AppUtil.showErrorMsg(result, "获取失败");
        })

    }

    $scope.findUsers();

    $scope.clickEdit = function (temp_name, temp_email) {
        $scope.user.username = temp_name;
        $scope.user.password = "";
        $scope.user.email = temp_email;
        $scope.appForm_show = true;
    }
}
