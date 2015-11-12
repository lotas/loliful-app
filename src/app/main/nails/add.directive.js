export function AddNailDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/nails/add.html',
        controller: AddNailController,
        controllerAs: 'nailAdd',
        scope: {
            onAdd: '&'
        },
        bindToController: true
    };

    return directive;
}

class AddNailController {
    constructor(Nail, toastr) {
        'ngInject';

        this.Nail = Nail;
        this.nail = {text: ''};
        this.toastr = toastr;
    }

    create() {
        this.saving = true;
        this.Nail.create(this.nail, res => {
            this.saving = false;
            if (typeof this.onAdd === 'function') {
                this.onAdd({nail: res});
            }
            this.nail.text = '';
        }, err => {
            if (err.status === 422) {
                this.toastr.error('Somebody already asked this question, sorry');
            } else {
                this.toastr.error('Oops, we cannot accept this text now, sorry.')
            }
            this.saving = false;
        });
    }
}
