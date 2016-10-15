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
        .catch(checkResponse);

    function checkAuthAndGo(data) {
        if (AuthService.hasToken()) {
            if (data && data.user && data.user.settings && data.user.settings.firstRun) {
                $state.go('login.first-run');
            } else {
                if (Storage.get('connect.account')) {
                    Storage.remove('connect.account');
                    $state.go('profile');
                //} else if (Storage.get('authRedirect')) {
                //    $location.replace(Storage.get('authRedirect'));
                //    Storage.remove('authRedirect');
                } else {
                    $state.go('fresh');
                }
            }
        } else {
            $state.go('login');
        }
    }

    function checkResponse(err) {
        if (err.status) {
            Storage.set('auth.shortToken', token);

            if (err.status === 402) {
                $state.go('login.invite');
            } else if (err.status === 412) {
                $state.go('login.invite', {used: 1});
            }
            return true;
        }

        checkAuthAndGo(err);
    }
}
