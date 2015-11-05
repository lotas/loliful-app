export class AuthService {
    constructor(User, LoopBackAuth, $http, $log, apiEndpoint) {
        'ngInject';

        this.User = User;
        this.LoopBackAuth = LoopBackAuth;
        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
    }

    hasToken() {
        return this.LoopBackAuth.accessTokenId !== null;
    }

    setToken(id, userId) {
        this.$log.debug('setToken: ', id, userId);
        this.LoopBackAuth.setUser(id, userId, userId);
        this.LoopBackAuth.rememberMe = true;
        this.LoopBackAuth.save();
    }

    loadInfo() {
        return this.$http.get(this.apiEndpoint + '/me').then(function(res) {
            return res.data;
        });
    }
}
