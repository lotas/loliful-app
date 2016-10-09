import { nailViewResolve } from './nails/view.controller';

/**
 *
 * @param {$stateProvider} $stateProvider
 */
export function mainRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('fresh', {
            parent: 'app',
            url: '/fresh/*type',
            views: {
                'content@app': {
                    templateUrl: 'app/main/fresh/fresh.html',
                    controller: 'FreshController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Fresh ∆ loliful.co'
            }
        })
        .state('top', {
            parent: 'app',
            url: '/top/*period',
            views: {
                'content@app': {
                    templateUrl: 'app/main/top/top.html',
                    controller: 'TopController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Top Ω loliful.co',
                authRequired: false
            }
        })
        .state('outros', {
            parent: 'app',
            url: '/outros/?period&order',
            views: {
                'content@app': {
                    templateUrl: 'app/main/outros/outros.html',
                    controller: 'OutrosController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Outros Ω loliful.co',
                authRequired: false
            }
        })
        .state('activity', {
            parent: 'app',
            url: '/activity/:type',
            views: {
                'content@app': {
                    templateUrl: 'app/main/activity/activity.html',
                    controller: 'ActivityController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Activity ∑ loliful.co'
            }
        })
        .state('notifications', {
            parent: 'app',
            url: '/notifications',
            views: {
                'content@app': {
                    templateUrl: 'app/main/notifications/notifications.html',
                    controller: 'NotificationsController',
                    controllerAs: 'vm'
                }
            },
            data: {
                pageTitle: 'Notifications ƒ loliful.co'
            }
        })
        .state('nail-view', {
            parent: 'app',
            url: '/nail/:nailId',
            views: {
                'content@app': {
                    templateUrl: 'app/main/nails/view.html',
                    controller: 'NailViewController',
                    controllerAs: 'nv'
                }
            },
            data: {
                pageTitle: 'Nail ∫ loliful.co'
            },
            resolve: {
                nail: nailViewResolve
            }
        })
    ;
}
