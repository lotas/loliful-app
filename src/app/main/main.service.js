export class MainService {
    constructor(apiEndpoint, $http, $modal, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
        this.$modal = $modal;
    }

    getFresh() {
        return this.$http.get(this.apiEndpoint + '/fresh').then(res => {
            return res.data;
        });
    }

    getTop() {
        return this.$http.get(this.apiEndpoint + '/top').then(res => {
            return res.data;
        });
    }

}