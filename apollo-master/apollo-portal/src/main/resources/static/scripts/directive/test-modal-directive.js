directive_module.directive('testmodal', testModalDirective);

function testModalDirective(toastr, $sce, AppUtil, EventManager, ConfigService) {
    return {
        restrict: 'E',
        templateUrl: '../../views/component/test-modal.html',
        transclude: true,
        replace: true,
        scope: {
            appId: '=',
            env: '=',
            cluster: '=',
            toOperationNamespace: '=',
            items: '=',
            testDbConnection: '=',
            testCacheConnection: '='
        },
        link: function (scope) {

            var namespace_test_type = {
                DATABASE: 'database',
                CACHE: 'cache',
                CLUSTER: 'cluster',
            };

            scope.doDbChange = doDbChange;
            scope.switchTest = switchTest;
            scope.doCacheChange = doCacheChange;


            scope.testConfig = {};
            scope.testConfig.testType = namespace_test_type.DATABASE;

            $('#testModal').on('show.bs.modal', function (e) {});

            scope.vm = {};
            scope.vm.values = [
                {SQLType: 'Oracle', driver: 'oracle.jdbc.OracleDriver'},
                {SQLType: 'MySQL', driver: 'com.mysql.jdbc.Driver'},
                {SQLType: 'SQLServer', driver: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'}
            ];
            scope.vm.selection = scope.vm.values[0];
            scope.driver = scope.vm.selection.driver;


            scope.cacheDatabase = {};
            scope.cacheDatabase.values = [
                {cacheType: 'Redis', cachePort: '6379'},
                {cacheType: 'Memcached', cachePort: '11211'},
                {cacheType: 'Mongodb', cachePort: '27017'}
            ];
            scope.cacheDatabase.selection = scope.cacheDatabase.values[0];
            scope.cachePort = scope.cacheDatabase.selection.cachePort;

            function doDbChange(){
                scope.driver = scope.vm.selection.driver;
            }

            function doCacheChange(){
                scope.cachePort = scope.cacheDatabase.selection.cachePort;
            }

            function switchTest(namespace, testType) {
                namespace.testType = testType;
            }

        }
    }
}


