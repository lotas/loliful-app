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
 * @param Nail
 * @param $stateParams
 */
export function nailViewResolve(Nail, $stateParams) {
    'ngInject';

    return Nail.findOne({
        filter: {
            where: {
                id: $stateParams.nailId
            },
            include: 'hammers'
        }
    }).$promise;
}
