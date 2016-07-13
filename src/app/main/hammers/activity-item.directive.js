export function HammerActivityItemDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/hammers/activity-item.html',
        controller: HammerActivityItemController,
        controllerAs: 'hai',
        scope: {
            hammer: '='
        },
        bindToController: true,
        replace: true
    };

    return directive;
}

class HammerActivityItemController {
    /**
     * @param  {Hammer} Hammer
     * @param  {SweetAlert} SweetAlert
     * @param  {any} $log
     */
    constructor(Hammer, SweetAlert, toastr, $log, $rootScope, AuthService) {
        'ngInject';

        this.Hammer = Hammer;
        this.SweetAlert = SweetAlert;
        this.$log = $log;
        this.toastr = toastr;
        this.$rootScope = $rootScope;

        this.isOwn = this.hammer.$user && String(AuthService.getUserId()) === String(this.hammer.$user.id);
    }

    delete() {
        if (this.isOwn) {
            this.SweetAlert.confirm('Remove', 'Is it this bad? Okay to remove it?', (res) => {
                if (res === true) {
                    this.Hammer.deleteById({id: this.hammer.id}).$promise.then(response => {
                        this.$rootScope.$emit('hammer.deleted', String(this.hammer.id));
                        this.hammer = null;
                    }).catch(err => {
                        this.toastr.warning(err.data.error.message || 'Oops, you cannot delete this');
                        this.$log.debug(err);
                    });
                }
            });
        }
    }

    vote() {
        if (this.isOwn) {
            this.$log.warn('Oh why would you wanna do this..');
            return false;
        }

        let method;
        if (this.hammer.$votes) {
            method = 'prototype$unvote';
            this.hammer.$votes = false;
        } else {
            method = 'prototype$vote';
            this.hammer.$votes = true;
        }

        this.Hammer[method]({
            id: this.hammer.id
        }).$promise.then(res => {
            this.hammer.countVotes = res.countVotes;
        }).catch(err => {
            this.$log.debug(err);
            this.toastr.warning('oh no!, vote failed');
        });
    }
}
