export class ShareService {
    constructor(apiEndpoint, SweetAlert, $http, $modal, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
        this.SweetAlert = SweetAlert;
        this.$modal = $modal;
    }

    getShare(id) {
        return this.$http.get(this.apiEndpoint + '/share/' + id).then(res => {
            return res.data;
        });
    }

    showDialog(share) {
        if (!share || !share.img) {
            return this.SweetAlert.warning('oops', 'something cannot be shared');
        }
        let url = this.buildImgUrl(share);
        return this.$modal({
            title: 'Share this',
            content: `
                <img src="${url}" />
                <input class="form-control" type="text" value="${url}" />
                `,
            html: true,
            show: true
        });
    }

    buildImgUrl(share) {
        return `${this.apiEndpoint}${share.img}`;
    }
}