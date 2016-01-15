import { mainRouteConfig } from './main.route';

import { FreshController } from './fresh/fresh.controller';
import { TopController } from './top/top.controller';
import { ActivityController } from './activity/activity.controller';

import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsListItemItemDirective } from './notifications/list-item.directive';

import { NailAddDirective } from './nails/add.directive';
import { NailListItemDirective } from './nails/list-item.directive';
import { NailViewController } from './nails/view.controller';

import { HammerListItemDirective } from './hammers/list-item.directive';
import { JokeListItemDirective } from './jokes/list-item.directive';

import { TimeAgoFilter } from './filters/time-ago.filter.js';

import { ShareService } from './share/share.service';
import { MainService } from './main.service';

angular.module('loliful.main', [])

    // Main
    .config(mainRouteConfig)
    .controller('FreshController', FreshController)
    .controller('TopController', TopController)
    .controller('ActivityController', ActivityController)

    .controller('NotificationsController', NotificationsController)
    .directive('notificationListItem', NotificationsListItemItemDirective)

    .directive('nailAdd', NailAddDirective)
    .directive('nailListItem', NailListItemDirective)
    .controller('NailViewController', NailViewController)

    .directive('hammerListItem', HammerListItemDirective)
    .directive('jokeListItem', JokeListItemDirective)

    .filter('timeAgo', TimeAgoFilter)

    .service('ShareService', ShareService)
    .service('MainService', MainService)
;

