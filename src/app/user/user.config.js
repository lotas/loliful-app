export function userConfig($httpProvider) {
    'ngInject';

    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth, Storage) {
        'ngInject';

        return {
            responseError: function(rejection) {
                if (rejection.status == 401) {
                    //Now clearing the loopback values from client browser for safe logout...
                    LoopBackAuth.clearUser();
                    LoopBackAuth.clearStorage();

                    Storage.set('authRedirect', $location.url());

                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
}
