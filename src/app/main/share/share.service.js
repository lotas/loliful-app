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

    showGenerating() {
        return this.$modal({
            title: 'Please wait, we are generating joke ..',
            content: '<img src="/assets/img/loliful-rocket.png" alt="generating content" style="width:550px" />',
            html: true,
            show: true
        });
    }

    showDialog(share) {
        if (!share || !share.url) {
            return this.SweetAlert.warning('oops', 'something cannot be shared');
        }

        return this.$modal({
            title: 'Share this',
            content: `
                <img src="${share.url}" style="width:98%" />
                <input class="form-control" type="text" value="${share.url}" />
                `,
            html: true,
            show: true
        });
    }

}