export class UserService {
    constructor(apiEndpoint, $http, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
    }

    getProfile(userId) {
        return this.$http.get(`${this.apiEndpoint}/profile/${userId}`).then(res => {
            return res.data;
        });
    }

    loadInfo() {
        return this.$http.get(this.apiEndpoint + '/me')
            .then(function(res) {
                return res.data;
            });
    }

    loadAvatar(userId) {
        return this.$http.get(`${this.apiEndpoint}/avatar/${userId}`)
            .then((res) => {
                return res.data;
            });
    }

    unlinkSocialAccount(provider) {
        return this.$http.get(`${this.apiEndpoint}/auth/unlink/${provider}`)
            .then((res) => {
                return res.data;
            });
    }
}
