export function config ($logProvider, toastrConfig, debugEnabled) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(debugEnabled);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
