export class ShareService {
    constructor(apiEndpoint, SweetAlert, $http, $modal, $log, $rootScope, toastr) {
        'ngInject';

        this.$http = $http;
        this.$log = $log;
        this.apiEndpoint = apiEndpoint;
        this.SweetAlert = SweetAlert;
        this.$modal = $modal;
        this.$rootScope = $rootScope;
        this.toastr = toastr;
    }

    getShare(nailId, hammerId) {
        return this.$http.get(`${this.apiEndpoint}/share/${nailId}/${hammerId}`).then(res => {
            return res.data;
        });
    }

    getShareIntro(nailId) {
        return this.$http.get(`${this.apiEndpoint}/share/${nailId}`).then(res => {
            return res.data;
        });
    }

    addShareClick(shareId, network) {
        return this.$http.post(`${this.apiEndpoint}/share/${shareId}/${network}`).then(res => {
            return res.data;
        });
    }

    /**
     * Get generated card for nail or hammer
     * Only one of the params is required
     *
     * @param {Hammer} hammer can be null
     * @param {Nail} nail can be null
     */
    showShareDialog(hammer, nail) {
        var $scope = this.$rootScope.$new();

        let obj = hammer || nail;

        $scope.share = obj._share || false;
        $scope.addClick = this.addShareClick.bind(this);

        this.$modal({
            templateUrl: 'app/main/share/dialog.html',
            prefixEvent: 'shareDialg',
            backdrop: 'static',
            prefixClass: 'shareDialog',
            animation: false,
            scope: $scope,
            show: true
        });

        if (!obj._share) {
            let successCb = res => {
                obj._share = res;
                $scope.share = res;
            };
            let errorCb = err => {
                this.$log.debug(err);
                this.SweetAlert.warning('O-ohh... Looks like we cannot share this now. Please try again.');
            };

            if (hammer) {
                this.getShare(hammer.nailId, hammer.id)
                    .then(successCb)
                    .catch(errorCb);
            } else if (nail) {
                this.getShareIntro(nail.id)
                    .then(successCb)
                    .catch(errorCb);
            }
        }
    }

}
