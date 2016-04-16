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

    'mgcrea.ngStrap',   // TODO: pick ones we use
    'matchMedia',

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

import './components/components.module';
import './main/main.module';
import './user/user.module';
import './pages/pages.module';
