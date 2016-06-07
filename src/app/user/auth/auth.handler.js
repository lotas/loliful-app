export function onAuthHandler(AuthService, $state, $location, $log, Storage) {
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

    function checkAuthAndGo(data) {
        if (AuthService.hasToken()) {
            if (data && data.user && data.user.settings && data.user.settings.firstRun) {
                $state.go('login.first-run');
            } else {
                if (Storage.get('connect.account')) {
                    Storage.remove('connect.account');
                    $state.go('profile');
                } else {
                    $state.go('fresh');
                }
            }
        } else {
            $state.go('login');
        }
    }

}
