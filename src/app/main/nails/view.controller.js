export class NailViewController {
    /**
     *
     */
    constructor(nail, Nail, User) {
        'ngInject';

        this.nail = nail;
        this.Nail = Nail;
        this.User = User;
    }

    reply() {
        this.Nail.prototype$__create__hammers({
            id: this.nail.id
        }, this._hammer)
            .$promise
            .then(res => {
                if (!this.nail.$hammers) {
                    this.nail.$hammers = [];
                }
                if (!res.$user) {
                    res.$user = this.User.getCurrent();
                }
                this.nail.$hammers.unshift(res);
                this.nail.countAnswers += 1;
                this._hammer = '';
            })
            .catch(err => {
                this.$log.debug(err);
                this.toastr.warning('oops, I failed again');
            });
    }
}

/**
 * Resolve current nail
 *
 * @param {MainService} MainService
 * @param $stateParams
 */
export function nailViewResolve(MainService, $stateParams) {
    'ngInject';

    return MainService.getNail($stateParams.nailId);
}


export function nailModalView($modal, nailId, $rootScope) {

    $modal({
        templateUrl: 'app/main/nails/view.modal.html',
        show: true,
        backdrop: !$rootScope.screen.isPhone,
        prefixEvent: 'nailView',
        controllerAs: 'nv',
        controller: nailViewCtrl
    });

    function nailViewCtrl(MainService, $state) {
        'ngInject';

        var nv = this;

        MainService.getNail(nailId).then(nail => {
            nv.nail = nail;
        });

        var dereg = $rootScope.$on('nailView.hide', function() {
            $state.transitionTo($rootScope.previousState, $rootScope.previousStateParams, {
                notify: false
            });
        });

        $rootScope.$on('$destroy', () => {
            dereg();
        });
    }
}

export function nailViewRun($state, $rootScope, $modal) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {
        // on mobile let's show the main page anyway
        if ($rootScope.screen.isPhone) return;
        if (fromState && fromState.name && toState.name === 'nail-view') {
            nailModalView($modal, toStateParams.nailId, $rootScope);

            $rootScope.previousState = fromState.name;
            $rootScope.previousStateParams = fromStateParams;

            $state.transitionTo(toState.name, toStateParams, {
                notify: false
            });
            event.preventDefault();
        }
    });
}
