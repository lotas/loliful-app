export const activityEmptyScreenComponent = {
    templateUrl: 'app/main/activity/empty-screen.html',
    bindings: {
        type: '<'
    },
    controller: function() {
        var ctrl = this;

        ctrl.img = '/assets/img/empty-card.png';
        ctrl.actionName = 'Посмотреть вопросы';
        ctrl.topText = false;

        ctrl.$onInit = onInit;

        function onInit() {
            if (ctrl.type === 'nails') {
                ctrl.img = '/assets/img/loliman-chill.svg';
                ctrl.topText = 'Вопросы появятся здесь';
            } else if (ctrl.type === 'hammers') {
                ctrl.img = '/assets/img/loliman-jump.svg';
                ctrl.actionName = 'Добавить вопрос';
                ctrl.topText = 'Ответы появятся здесь';
            }
        }
    }
};
