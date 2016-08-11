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

    showShareDialog(hammer) {
        var $scope = this.$rootScope.$new();
        $scope.hammer = hammer;
        $scope.share = hammer._share || false;
        $scope.addClick = this.addShareClick.bind(this);

        // TODO : add component

        this.$modal({
            templateUrl: 'app/main/share/dialog.html',
            prefixEvent: 'shareDialg',
            backdrop: 'static',
            animation: false,
            scope: $scope,
            show: true
        });

        if (!hammer._share) {
            this.getShare(hammer.nailId, hammer.id).then(res => {
                hammer._share = res;
                $scope.share = res;
            }).catch(err => {
                this.$log.debug(err);
                this.SweetAlert.warning('O-ohh... Looks like we cannot share this now. Please try again.');
            });
        }
    }

}
