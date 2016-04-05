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
                <img src="${share.img}" style="width:98%" />
                <p>Url: <input class="form-control" type="text" value="${share.url}" /></p>
                <p>Image: <input class="form-control" type="text" value="${share.img}" /></p></p>
                <div class="providers">
                    <div class="provider hvr-float">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share.url)}" target="_blank"><img src="https://loliful.io/img/fb.svg" style="height:32px" alt="Facebook" /></a>
                    </div>
                    <div class="provider hvr-float">
                        <a href="https://twitter.com/?status=${encodeURIComponent(share.url)}" target="_blank"><img src="https://loliful.io/img/twitter.svg" style="height:32px" alt="Twitter" /></a>
                    </div>
                </div>
                `,
            html: true,
            show: true
        });
    }

}
