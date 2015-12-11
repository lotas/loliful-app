export class NailViewController {
    /**
     *
     */
    constructor(nail) {
        'ngInject';

        this.nail = nail;
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
