import { LoginController, LogoutController } from './auth/auth.controllers';
import { authRouteConfig } from './auth/auth.route';

import { ProfileController } from './profile/profile.controller';
import { profileRouteConfig } from './profile/profile.route';

import { AuthService } from './auth/auth.service';

angular.module('loliful.user', [])

    // Auth
    .config(authRouteConfig)
    .service('AuthService', AuthService)
    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)

    // Profile
    .config(profileRouteConfig)
    .controller('ProfileController', ProfileController)

;

