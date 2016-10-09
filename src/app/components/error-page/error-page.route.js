/**
 *
 * @param {$stateProvider} $stateProvider
 */
export function errorPageRouteConfig($stateProvider) {
    'ngInject';
    $stateProvider
        .state('not-found', {
            parent: 'guest',
            url: '/not-found?error',
            views: {
                'main@guest': {
                    templateUrl: 'app/components/error-page/not-found.html'
                }
            },
            data: {
                pageTitle: '∫404∂x loliful.co',
                showStaticHeader: true
            }
        })
        .state('error', {
            parent: 'guest',
            url: '/error',
            views: {
                'main@guest': {
                    templateUrl: 'app/components/error-page/error.html'
                }
            },
            data: {
                pageTitle: 'Error ∞ ≤ ∆ loliful.co',
                showStaticHeader: true
            }
        })
    ;
}
