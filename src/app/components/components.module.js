
import './api/lb.services';

import { WebDevTecService } from './webDevTec/webDevTec.service';
import { NavbarDirective } from './navbar/navbar.directive';

angular.module('loliful.components', ['lbServices'])
  .service('webDevTec', WebDevTecService)
  .directive('acmeNavbar', NavbarDirective);
