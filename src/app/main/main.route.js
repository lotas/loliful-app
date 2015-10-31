/**
 *
 * @param {$stateProvider} $stateProvider
 */
export function mainRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('fresh', {
            parent: 'app',
            url: '/fresh',
            views: {
                'content@app': {
                    templateUrl: 'app/main/fresh.html',
                    controller: 'FreshController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('top', {
            parent: 'app',
            url: '/top',
            views: {
                'content@app': {
                    templateUrl: 'app/main/top.html',
                    controller: 'TopController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('activity', {
            parent: 'app',
            url: '/activity',
            views: {
                'content@app': {
                    templateUrl: 'app/main/activity.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm'
                }
            }
        })
    ;
}
