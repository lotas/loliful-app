import { mainRouteConfig } from './main.route';

import { FreshController } from './fresh.controller';
import { TopController } from './top.controller';
import { ActivityController } from './activity.controller';

import { NailAddDirective } from './nails/add.directive';
import { NailListItemDirective } from './nails/list-item.directive';
import { NailViewController } from './nails/view.controller';

import { HammerListItemDirective } from './hammers/list-item.directive';
import { JokeListItemDirective } from './jokes/list-item.directive';

import { ShareService } from './share/share.service';
import { MainService } from './main.service';

angular.module('loliful.main', [])

    // Main
    .config(mainRouteConfig)
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)

    .directive('nailAdd', NailAddDirective)
    .directive('nailListItem', NailListItemDirective)
    .controller('NailViewController', NailViewController)

    .directive('hammerListItem', HammerListItemDirective)
    .directive('jokeListItem', JokeListItemDirective)

    .service('ShareService', ShareService)
    .service('MainService', MainService)
;

