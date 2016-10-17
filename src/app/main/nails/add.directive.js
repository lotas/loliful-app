const addPlaceholders = [
    'Может быть смешным',
    'Тысячи медведей ежегодно трут земную ось',
    'Тут место для шутки',
    'Хаха',
    'Но смешно',
    'Орфография 10х12'
];

export function NailAddDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/main/nails/add.html',
        controller: NailAddController,
        controllerAs: 'nailAdd',
        replace: true,
        scope: {
            onAdd: '&',
            onClose: '&'
        },
        bindToController: true
    };

    return directive;
}

export class NailAddController {
    constructor(Nail, toastr, $rootScope) {
        'ngInject';

        this.Nail = Nail;
        this.nail = {text: ''};
        this.toastr = toastr;
        this.$rootScope = $rootScope;

        this.placeholder = addPlaceholders[Math.floor(Math.random() * addPlaceholders.length)];
    }

    create() {
        if (!this.nail.text || this.nail.text.length < 2 || this.nail.text.length > 212) {
            return false;
        }
        this.saving = true;
        this.Nail.create(this.nail, res => {
            this.saving = false;
            this.$rootScope.$emit('nail.add.success', res);
            this.nail.text = '';
            this.toastr.success(`Готово! Ждем ответов.`);
        }, err => {
            if (err.status === 422) {
                this.toastr.error('Кто-то уже спрашивал это');
            } else {
                this.toastr.error('Ого.. Не получилось сейчас.')
            }
            this.saving = false;
            this.$rootScope.$emit('nail.add.error', err);
        });
    }
}
