export function onAuthHandler(AuthService, $state, $location, $log) {
    'ngInject';

    let token = $location.search().token;
    if (!token) {
        $log.debug('token not found');

        if (AuthService.hasToken()) {
            $state.go('profile');
        } else {
            $state.go('login');
        }
        return false;
    }

    try {
        token = angular.fromJson(atob(token));
    } catch (e) {
        $log.debug('Error decoding token', e);
        return $state.go('login');
    }

    if (token && token.id) {
        AuthService.setToken(token.id, token.userId);
        $state.go('profile');
    } else {
        $state.go('login');
    }

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
