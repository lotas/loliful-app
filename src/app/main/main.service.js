export class MainService {
    constructor(apiEndpoint, $http, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
    }

    getNail(id) {
        return this.$http.get(`${this.apiEndpoint}/nail/${id}`).then(res => {
            return res.data.nail;
        });
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

    getActivity(type) {
        if (['likes', 'saves', 'nails', 'hammers'].indexOf(type) < 0) {
            throw new Error("Unknown type " + type);
        }
        return this.$http.get(`${this.apiEndpoint}/activity/${type}`).then(res => {
            return res.data;
        });
    }

}