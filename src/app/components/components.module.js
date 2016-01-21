import './api/lb.services';
import { configApi } from './api/api.config';
import { Storage, storageConfig } from './storage.service';
import { PageService, runPageService } from './page.service';
import { NavigationDirective } from './navigation/navigation.directive';
import { FloatMenuDirective } from './navigation/float-menu.directive';
import { errorPageRouteConfig } from './error-page/error-page.route';
import { SweetAlert } from './sweet-alert.service';
import { LiveService, runLiveService } from './live.service';

angular.module('loliful.components', [
        'lbServices',
        'LocalStorageModule',
        'mgcrea.ngStrap.helpers.debounce' // throttle
    ])
    .config(storageConfig)
    .config(configApi)
    .service('Storage', Storage)

    .config(errorPageRouteConfig)

    .service('SweetAlert', SweetAlert)

    .service('PageService', PageService)
    .run(runPageService)

    .service('LiveService', LiveService)
    .run(runLiveService)

    .directive('lolifulNavigation', NavigationDirective)
    .directive('floatMenu', FloatMenuDirective)
;
