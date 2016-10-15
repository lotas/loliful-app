import { LoginController, FirstRunController, InviteController } from './auth/auth.controllers';
import { SignupController } from './auth/signup.controllers';
import { authRouteConfig } from './auth/auth.route';

import { ProfileController } from './profile/profile.controller';
import { ProfilePublicController } from './profile/public.controller';
import { ProfileActivityController } from './profile/activity.controller';
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
    .controller('FirstRunController', FirstRunController)
    .controller('InviteController', InviteController)
    .controller('SignupController', SignupController)

    // Profile
    .config(profileRouteConfig)
    .controller('ProfileController', ProfileController)
    .controller('ProfilePublicController', ProfilePublicController)
    .controller('ProfileActivityController', ProfileActivityController)
    .service('UserService', UserService)

;

