import { LoginController, LogoutController } from './auth/auth.controllers';
import { SignupController } from './auth/signup.controllers';
import { authRouteConfig } from './auth/auth.route';

import { ProfileController } from './profile/profile.controller';
import { ProfilePublicController } from './profile/public.controller';
import { profileRouteConfig } from './profile/profile.route';

import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { userConfig } from './user.config';

angular.module('loliful.user', [])

    .config(userConfig)

    // Auth
    .config(authRouteConfig)
    .service('AuthService', AuthService)
    .controller('LoginController', LoginController)
    .controller('LogoutController', LogoutController)
    .controller('SignupController', SignupController)

    // Profile
    .config(profileRouteConfig)
    .controller('ProfileController', ProfileController)
    .controller('ProfilePublicController', ProfilePublicController)
    .service('UserService', UserService)

;

