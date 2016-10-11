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
                pageTitle: 'Fresh ∆ Loliful.io'
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
                pageTitle: 'Top Ω Loliful.io',
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
                pageTitle: 'Outros Ω Loliful.io',
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
                pageTitle: 'Activity ∑ Loliful.io'
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
                pageTitle: 'Notifications ƒ Loliful.io'
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
                pageTitle: 'Nail ∫ Loliful.io'
            },
            resolve: {
                nail: nailViewResolve
            }
        })
    ;
}
