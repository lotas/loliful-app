import { resolveCurrentUser } from './profile.controller';

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
                'content@app': {
                    templateUrl: 'app/user/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                currentUser: resolveCurrentUser
            }
        })
    ;
}
