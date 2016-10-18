import { resolveCurrentUser } from './profile.controller';
import { resolvePublicProfile } from './public.controller';

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
            },
            data: {
                pageTitle: 'Профиль @ loliful.co'
            }
        })
        .state('profile.public', {
            parent: 'app',
            url: '/profile/:id',
            views: {
                'content@app': {
                    templateUrl: 'app/user/profile/public.html',
                    controller: 'ProfilePublicController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                profile: resolvePublicProfile
            },
            data: {
                pageTitle: 'Профиль @ loliful.co'
            }
        })
        .state('profile.activity', {
            parent: 'app',
            url: '/profile/:id/:activityType',
            views: {
                'content@app': {
                    templateUrl: 'app/user/profile/activity.html',
                    controller: 'ProfileActivityController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                profile: resolvePublicProfile
            },
            data: {
                pageTitle: 'Профиль @ loliful.co'
            }
        })
    ;
}
