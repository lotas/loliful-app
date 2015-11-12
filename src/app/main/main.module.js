import { mainRouteConfig } from './main.route';

import { FreshController } from './fresh.controller';
import { TopController } from './top.controller';
import { ActivityController } from './activity.controller';

import { AddNailDirective } from './nails/add.directive';

angular.module('loliful.main', [])

    // Main
    .config(mainRouteConfig)
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)

    .directive('addNail', AddNailDirective);
;

