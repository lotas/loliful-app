export function config($logProvider, toastrConfig, debugEnabled, html5Mode,
                       $compileProvider, $httpProvider, $locationProvider,
                       $dropdownProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(debugEnabled);
    $compileProvider.debugInfoEnabled(debugEnabled);
    $httpProvider.useApplyAsync(!debugEnabled);

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // html5mode doesn't work well with protractor tests for some reason .. why?
    $locationProvider.html5Mode(html5Mode);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = false;

    angular.extend($dropdownProvider.defaults, {
        html: true
    });

    // angular-loading-bar
    // cfpLoadingBarProvider.includeSpinner = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
}
