import { mainRouteConfig } from './main.route';
import { LoginController, LogoutController } from './auth/auth.controllers';
import { authRouteConfig } from './auth/auth.route';

import { FreshController } from './fresh.controller';
import { TopController } from './top.controller';
import { ActivityController } from './activity.controller';

angular.module('loliful.main', [])
    .config(authRouteConfig)
    .config(mainRouteConfig)
    // Auth
    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)
    // Main
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)
;

