import { MainController } from './main.controller';
import { mainRouteConfig } from './main.route';

angular.module('loliful.main', [])
  .config(mainRouteConfig)
  .controller('MainController', MainController);

