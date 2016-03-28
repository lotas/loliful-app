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
                },
                'side-menu@app': {
                    templateUrl: 'app/main/fresh/side-menu.html'
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
                },
                'side-menu@app': {
                    templateUrl: 'app/main/top/side-menu.html'
                }
            },
            data: {
                pageTitle: 'Top Ω Loliful.io'
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
                },
                'side-menu@app': {
                    templateUrl: 'app/main/activity/side-menu.html'
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
