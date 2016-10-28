import './api/lb.services';
import { configApi } from './api/api.config';
import { Storage, storageConfig } from './storage.service';
import { PageService, runPageService } from './page.service';
import { NavigationDirective } from './navigation/navigation.directive';
import { FloatMenuDirective } from './navigation/float-menu.directive';
import { errorPageRouteConfig } from './error-page/error-page.route';
import { SweetAlert } from './sweet-alert.service';
import { LiveService, runLiveService } from './live.service';
import { AvatarDirective } from './directives/avatar.directive';
import { FixDimensionsDirective } from './directives/fix-dimensions.directive';
import { LoadingDirective } from './directives/loading.directive';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { EscKeyDirective } from './directives/esc-key.directive';

import { InitialsFilter } from './filters/initials.filter';

import { attachFastclick } from './fastclick';
import { scrollbarsConfig } from './scrollbars.confg';

import { alertComponent } from './alert/alert.component';

import { ErrorLogService, exceptionConfig } from './error-log.service';

import './app-state/app-state.module';

angular.module('loliful.components', [
        'lbServices',
        'LocalStorageModule',
        'mgcrea.ngStrap.helpers.debounce', // throttle
        'ngScrollbars',
        'ngclipboard',
        'loliful.appState'
    ])
    .config(storageConfig)
    .config(configApi)
    .config(scrollbarsConfig)
    .service('Storage', Storage)

    .config(errorPageRouteConfig)

    .service('SweetAlert', SweetAlert)

    .service('PageService', PageService)
    .run(runPageService)

    .service('LiveService', LiveService)
    .run(runLiveService)

    .directive('lolifulNavigation', NavigationDirective)
    .directive('floatMenu', FloatMenuDirective)

    .directive('avatar', AvatarDirective)
    .directive('fixDimensions', FixDimensionsDirective)
    .directive('loading', LoadingDirective)
    .directive('autoFocus', AutoFocusDirective)
    .directive('escKey', EscKeyDirective)

    .filter('initials', InitialsFilter)

    .component('alert', alertComponent)

    .run(attachFastclick)

    //trackJs
    .factory('ErrorLogService', ErrorLogService)
    .config(exceptionConfig)
;
