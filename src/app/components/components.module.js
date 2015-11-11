import './api/lb.services';
import { configApi } from './api/api.config';
import { Storage, storageConfig } from './storage.service';
import { PageService, runPageService } from './page.service';
import { NavigationDirective } from './navigation/navigation.directive';

angular.module('loliful.components', ['lbServices', 'LocalStorageModule'])
    .config(storageConfig)
    .config(configApi)
    .service('Storage', Storage)

    .service('PageService', PageService)
    .run(runPageService)

    .directive('lolifulNavigation', NavigationDirective)
;
