import { mainRouteConfig } from './main.route';

import { FreshController } from './fresh.controller';
import { TopController } from './top.controller';
import { ActivityController } from './activity.controller';

import { NailAddDirective } from './nails/add.directive';
import { NailListItemDirective } from './nails/list-item.directive';

angular.module('loliful.main', [])

    // Main
    .config(mainRouteConfig)
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)

    .directive('nailAdd', NailAddDirective)
    .directive('nailListItem', NailListItemDirective)
;

