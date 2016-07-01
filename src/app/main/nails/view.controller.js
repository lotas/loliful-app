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

    var modal = $modal({
        templateUrl: 'app/main/nails/view.modal.html',
        show: true,
        backdrop: !$rootScope.screen.isPhone,
        prefixEvent: 'nailView',
        controllerAs: 'nv',
        controller: nailViewCtrl
    });

    function nailViewCtrl(MainService, $state, $anchorScroll) {
        'ngInject';

        var nv = this;

        nv.onNailClick = function() {
            $anchorScroll('nail-back-btn');
        };

        nv.closeModal = function() {
            if ($rootScope.previousStateSet) {
                $state.transitionTo(
                    $rootScope.previousState,
                    $rootScope.previousStateParams,
                    {notify: false}
                );
            } else {
                $state.transitionTo('fresh');
            }
            modal.hide();
            cleanUp();
        };

        MainService.getNail(nailId).then(nail => {
            nv.nail = nail;
            initScrollHandler();
        }, err => {
            modal.hide();
        });

        var dereg = $rootScope.$on('nailView.hide', function() {
            if (!$rootScope.previousStateSet && !$rootScope.__startedTrans) {
                $state.transitionTo('fresh');
            }

            cleanUp();
        });
        var dereg2 = $rootScope.$on('nail.deleted', function(evt, deletedNailId) {
            if (String(nailId) === String(deletedNailId)) {
                modal.hide();
            }
        });
        var dereg3 = $rootScope.$on('hammer.deleted', (evt, hammerId) => {
            for (let idx in nv.nail.$hammers) {
                if (String(nv.nail.$hammers[idx].id) === hammerId) {
                    nv.nail.$hammers.splice(idx, 1);
                    break;
                }
            }
        });

        var dereg4 = $rootScope.$on('$stateChangeStart', function() {
            modal.hide();
        });

        var nailModal;

        function initScrollHandler() {
            if ($rootScope.screen.isPhone) {
                nailModal = angular.element('#nail-view-modal');
                nailModal.on('scroll', scrollHandler);
            }
        }


        function cleanUp() {
            dereg();
            dereg2();
            dereg3();
            dereg4();

            if ($rootScope.screen.isPhone) {
                nailModal.off('scroll', scrollHandler);
            }
        }

        function scrollHandler() {
            if (nailModal.scrollTop() > 140) {
                nailModal.addClass('nail-fixed');
            } else {
                nailModal.removeClass('nail-fixed');
            }
        }
    }
}

export function nailViewRun($state, $rootScope, $modal, User) {
    'ngInject';

    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.__startedTrans = false;
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {

        // prevent popup from showing for unauthorized users
        if (!User.isAuthenticated()) {
            return false;
        }

        //if ($rootScope.screen.isPhone) return;
        if (toState.name && toState.name === 'nail-view') {
            nailModalView($modal, toStateParams.nailId, $rootScope);

            $rootScope.previousStateSet = !!fromState.name;
            $rootScope.previousState = fromState.name || 'fresh';
            $rootScope.previousStateParams = fromStateParams;

            $state.transitionTo(toState.name, toStateParams, {
                notify: false
            });
            event.preventDefault();
        } else if (fromState &&
            fromState.name === 'nail-view' &&
            $rootScope.previousStateSet &&
            $rootScope.previousState === toState.name &&
            angular.equals(toStateParams, $rootScope.previousStateParams)) {
            // just hide the dialog
            $state.transitionTo($rootScope.previousState, $rootScope.previousStateParams, {
                notify: false
            });
            event.preventDefault();
        } else {
            // hack to prevent single modal from sending back to wrong page
            $rootScope.__startedTrans = true;
        }
    });
}
