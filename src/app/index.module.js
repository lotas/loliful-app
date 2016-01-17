/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// env config
import './config';

angular.module('loliful', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'toastr',

    'mgcrea.ngStrap',

    'infinite-scroll',
    'angular-loading-bar',

    'CONFIG',
    'loliful.components',
    'loliful.main',
    'loliful.user',
    'loliful.pages'
  ])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
;

import '../app/components/components.module';
import '../app/main/main.module';
import '../app/user/user.module';
import '../app/pages/pages.module';
