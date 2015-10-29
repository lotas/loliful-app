export function config($logProvider, toastrConfig, debugEnabled, $compileProvider, $httpProvider) {
    'ngInject';
    // Enable log
    $logProvider.debugEnabled(debugEnabled);
    $compileProvider.debugInfoEnabled(debugEnabled);
    $httpProvider.useApplyAsync(!debugEnabled);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
}
