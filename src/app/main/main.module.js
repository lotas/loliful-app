import { MainController } from './main.controller';
import { mainRouteConfig } from './main.route';
import { LoginController } from './auth/auth.controllers';
import { authRouteConfig } from './auth/auth.route';

angular.module('loliful.main', [])
  .config(authRouteConfig)
  .config(mainRouteConfig)
  .controller('LoginController', LoginController)
  .controller('MainController', MainController);

