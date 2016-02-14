export function onAuthHandler(AuthService, $state, $location, $log) {
    'ngInject';

    let token = $location.search().token;
    if (!token) {
        $log.debug('token not found');

        checkAuthAndGo();
        return false;
    }

    AuthService.loadToken(token)
        .then(checkAuthAndGo)
        .catch(checkAuthAndGo);

    function checkAuthAndGo() {
        if (AuthService.hasToken()) {
            $state.go('fresh');
        } else {
            $state.go('login');
        }
    }

    // if (token && token.id) {
    //     AuthService.setToken(token.id, token.userId);
    //     //
    //     //   LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
    //     //   LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
    //     //   LoopBackAuth.save();
    //     //
    //     $state.go('profile');
    // } else {
    //     $state.go('login');
    // }

    //AuthService.loadInfo().then((user) => {
    //    // store token
    //    if (user) {
    //        $log.log(user);
    //    } else {
    //        $log.info('no user? redirect to login');
    //        $state.go('login');
    //    }
    //}).catch((err) => {
    //    $log.error(err);
    //    $state.go('login');
    //});
}
