export function config($logProvider, toastrConfig, debugEnabled, html5Mode,
                       $compileProvider, $httpProvider, $locationProvider,
                       $dropdownProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(debugEnabled);
    $compileProvider.debugInfoEnabled(debugEnabled);
    $httpProvider.useApplyAsync(!debugEnabled);

    // allow custom protocols
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|whatsapp|viber):/);

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // html5mode doesn't work well with protractor tests for some reason .. why?
    $locationProvider.html5Mode(html5Mode);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-loliful';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = false;

    angular.extend($dropdownProvider.defaults, {
        html: true
    });

    // angular-loading-bar
    // cfpLoadingBarProvider.includeSpinner = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

    addNetInterceptors($httpProvider);
}


function addNetInterceptors($httpProvider) {
    $httpProvider.interceptors.push(function($q, $location, $injector, $log) {
        'ngInject';

        var $rootScope = $injector.get('$rootScope');

        let isOffline = (state) => $rootScope.network = { offline: state };

        return {
            response: function(response) {
                isOffline(false);
                return response;
            },
            requestError: function(rejection) {
                if (rejection.status && rejection.status < 0) {
                    $log.debug('Network unreachable', rejection.config);

                    isOffline(true);
                }
                return $q.reject(rejection);
            },
            responseError: function(rejection) {
                if (rejection.status && rejection.status < 0) {
                    $log.debug('Network unreachable', rejection.config);

                    isOffline(true);
                }
                return $q.reject(rejection);
            }
        };
    });
}
