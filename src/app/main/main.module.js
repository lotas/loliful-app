import { mainRouteConfig } from './main.route';

import { FreshController } from './fresh.controller';
import { TopController } from './top.controller';
import { ActivityController } from './activity.controller';

angular.module('loliful.main', [])

    // Main
    .config(mainRouteConfig)
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)
;

