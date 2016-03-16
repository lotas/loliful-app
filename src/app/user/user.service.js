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


}
