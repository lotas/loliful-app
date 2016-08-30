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

    return modal;

    function nailViewCtrl(MainService, $state, $anchorScroll) {
        'ngInject';

        var nv = this;
        nv.onNailClick = scrollBack;
        nv.reply = sendReply

        function scrollBack() {
            $anchorScroll('nail-back-btn');
        }
        function sendReply() {
            $rootScope.$emit('nail.reply-added', nailId, nv._hammerText);
            nv._replyForm = false;
            nv._hammerText = '';
        }

        MainService.getNail(nailId).then(nail => {
            nv.nail = nail;
            initScrollHandler();
        }, () => {
            modal.hide();
        });

        var dereg = $rootScope.$on('nailView.hide', function() {

            if (!$rootScope.__startedTrans) {
                if ($rootScope.previousStateSet) {
                    $state.transitionTo(
                        $rootScope.previousState,
                        $rootScope.previousStateParams,
                        {notify: false}
                    );
                } else {
                    $state.transitionTo('fresh');
                }
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

            if ($rootScope.screen.isPhone) {
                nailModal.off('scroll', scrollHandler);
            }
        }

        function scrollHandler() {
            // dont mess with edit form
            if (nv._replyForm) {
                return false;
            }

            let scrollTop = nailModal.scrollTop();
            if (scrollTop > 60) {
                nailModal.addClass('nail-fixed');
            } else {
                nailModal.removeClass('nail-fixed');
            }
        }
    }
}

export function nailViewRun($state, $rootScope, $modal, User) {
    'ngInject';

    var modal;

    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.__startedTrans = false;
    });
    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState, fromStateParams) {

        // prevent popup from showing for unauthorized users
        if (!User.isAuthenticated()) {
            return false;
        }

        if (fromState && fromState.name === 'nail-view' && toState.name !== 'nail-view') {
            if (modal) {
                modal.hide();
            }
        }

        //if ($rootScope.screen.isPhone) return;
        if (toState.name && toState.name === 'nail-view') {
            modal = nailModalView($modal, toStateParams.nailId, $rootScope);

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
