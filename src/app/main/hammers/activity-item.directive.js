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
    constructor(Hammer, SweetAlert, toastr, $log, AuthService) {
        'ngInject';

        this.Hammer = Hammer;
        this.SweetAlert = SweetAlert;
        this.$log = $log;
        this.toastr = toastr;

        this.isOwn = this.hammer.$user && String(AuthService.getUserId()) === String(this.hammer.$user.id);
    }

    delete() {
        if (this.isOwn) {
            this.SweetAlert.confirm('Remove', 'Is it this bad? Okay to remove it?', (res) => {
                if (res === true) {
                    this.Hammer.deleteById({id: this.hammer.id}).$promise.then(response => {
                        this.$log.debug(response);
                        this.hammer = null;
                    }).catch(err => {
                        this.toastr.warning(err.data.error.message || 'Oops, you cannot delete this');
                        this.$log.debug(err);
                    });
                }
            });
        }
    }
}
