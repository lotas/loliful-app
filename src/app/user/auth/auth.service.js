export class AuthService {
    constructor(User, LoopBackAuth, $http, $log, apiEndpoint) {
        'ngInject';

        this.User = User;
        this.LoopBackAuth = LoopBackAuth;
        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
    }

    getUserId() {
        return this.LoopBackAuth.currentUserId;
    }

    isMod() {
        // todo not the best way.. i know
        return this.getUserId() < 10;
    }

    getToken() {
        if (!this.hasToken()) {
            return null;
        }
        return {
            id: this.LoopBackAuth.accessTokenId,
            userId: this.LoopBackAuth.currentUserId
        };
    }

    hasToken() {
        return this.LoopBackAuth.accessTokenId !== null;
    }

    setToken(id, userId, user) {
        this.$log.debug('setToken: ', id, userId);
        this.LoopBackAuth.setUser(id, userId, user);
        this.LoopBackAuth.rememberMe = true;
        this.LoopBackAuth.save();
    }

    loadToken(token) {
        return this.$http.get(this.apiEndpoint + '/auth/token/' + token)
            .then((res) => {
                if (res.data.accessToken && res.data.user) {
                    this.setToken(
                        res.data.accessToken.id,
                        res.data.accessToken.userId,
                        res.data.user
                    );
                }
                return res.data;
            });
    }
}
