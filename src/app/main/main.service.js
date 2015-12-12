export class MainService {
    constructor(apiEndpoint, $http, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
    }

    _getQuery(params) {
        return params ? ('?' + jQuery.param(params)) : '';
    }

    getNail(id) {
        return this.$http.get(`${this.apiEndpoint}/nail/${id}`).then(res => {
            return res.data.nail;
        });
    }

    getFresh(params) {
        return this.$http.get(this.apiEndpoint + '/fresh' + this._getQuery(params)).then(res => {
            return res.data;
        });
    }

    getTop(params) {
        return this.$http.get(this.apiEndpoint + '/top' + this._getQuery(params)).then(res => {
            return res.data;
        });
    }

    getActivity(type, params) {
        if (['likes', 'saves', 'nails', 'hammers'].indexOf(type) < 0) {
            throw new Error("Unknown type " + type);
        }
        return this.$http.get(`${this.apiEndpoint}/activity/${type}${this._getQuery(params)}`).then(res => {
            return res.data;
        });
    }

}