export function config($logProvider, toastrConfig, debugEnabled, html5Mode,
                       $compileProvider, $httpProvider, $locationProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(debugEnabled);
    $compileProvider.debugInfoEnabled(debugEnabled);
    $httpProvider.useApplyAsync(!debugEnabled);

    // html5mode doesn't work well with protractor tests for some reason .. why?
    $locationProvider.html5Mode(html5Mode);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
}
