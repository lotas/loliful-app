/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

angular.module('loliful', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'mgcrea.ngStrap',
    'toastr',

    'loliful.components',
    'loliful.main'
  ])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
;

import '../app/components/components.module';
import '../app/main/main.module';
