export function HammerListItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/hammers/list-item.html',
        controller: HammerListItemController,
        controllerAs: 'hli',
        scope: {
            hammer: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class HammerListItemController {
    /**
     *
     * @param {Nail} Nail
     * @param {Hammer} Hammer
     * @param {ShareService} ShareService
     */
    constructor(Nail, Hammer, ShareService, toastr, $http, $log) {
        'ngInject';

        this.Nail = Nail;
        this.Hammer = Hammer;
        this.$log = $log;
        this.toastr = toastr;
        this.ShareService = ShareService;
    }

    report() {
        this.Hammer.prototype$report({id: this.hammer.id}).$promise.then(res => {
            this.hammer._isReported = true;
            this.toastr.success('Thank you for reporting!');
        }).catch(err => {
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    favorite() {
        this.Hammer.prototype$addToFav({id: this.hammer.id}).$promise.then(res => {
            this.hammer._favorite = true;
        }).catch(err => {
            this.toastr.warning('oh no!, something horrible happened');
        });
    }

    vote() {
        this.Hammer.prototype$vote({id: this.hammer.id}).$promise.then(res => {
            this.hammer.countVotes = res.countVotes;
            this.hammer._votes = true;
        }).catch(err => {
            this.toastr.warning('oh no!, vote failed');
        });
    }

    share() {
        if (!this.hammer._share) {
            this.ShareService.getShare(this.hammer.id).then(res => {
                 this.hammer._share = res;
                 this.ShareService.showDialog(res);
            }).catch(err => {
                 this.toastr.warning('Oh boy... God knows how hard I try, but it failed this time');
            });
        } else {
            this.ShareService.showDialog(this.hammer._share);
        }
    }
}
