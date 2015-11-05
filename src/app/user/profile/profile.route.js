/**
 *
 * @param {$stateProvider} $stateProvider
 */
export function profileRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('profile', {
            parent: 'app',
            url: '/profile',
            views: {
                templateUrl: 'app/user/profile/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm'
            }
        })
    ;
}
