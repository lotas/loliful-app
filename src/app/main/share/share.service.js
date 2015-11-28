export class ShareService {
    constructor(apiEndpoint, $http, $modal, $log) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
        this.$modal = $modal;
    }

    getShare(id) {
        return this.$http.get(this.apiEndpoint + '/share/' + id).then(res => {
            return res.data;
        });
    }

    showDialog(share) {
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