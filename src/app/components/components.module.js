import './api/lb.services';
import { configApi } from './api/api.config';
import { Storage, storageConfig } from './storage.service';
import { PageService, runPageService } from './page.service';
import { NavigationDirective } from './navigation/navigation.directive';
import { errorPageRouteConfig } from './error-page/error-page.route';

angular.module('loliful.components', ['lbServices', 'LocalStorageModule'])
    .config(storageConfig)
    .config(configApi)
    .service('Storage', Storage)

    .config(errorPageRouteConfig)

    .service('PageService', PageService)
    .run(runPageService)

    .directive('lolifulNavigation', NavigationDirective)
;
