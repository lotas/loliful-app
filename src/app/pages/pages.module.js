
angular.module('loliful.pages', [])
       .config(pagesRouterConfig);

function pagesRouterConfig($stateProvider) {
    'ngInject';


    $stateProvider
        .state('page', {
            abstract: true,
            parent: 'app'
        })
        .state('page.about', {
            parent: 'page',
            url: '/about',
            views: {
                'content@app': {
                    templateUrl: 'app/pages/about.html'
                }
            }
        });
}

