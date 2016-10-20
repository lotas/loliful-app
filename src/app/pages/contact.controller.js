
const placeholders = [
    'Пацаны ваще ребята, но ...',
    'Я так смеялся, но не понял ничего...',
    'А можно бы мне на сайт картинку...',
    'А можно я с другом ...'
];

function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}


export class PageContactController {
    /**
     *
     * @param {User} User
     * @param {$http} $http
     * @param {toastr} toastr
     * @param {apiEndpoint} apiEndpoint
     */
    constructor(User, $http, toastr, apiEndpoint) {
        'ngInject';

        this.User = User;
        this.$http = $http;
        this.toastr = toastr;
        this.apiEndpoint = apiEndpoint;

        this.placeholder = random(placeholders);
    }

    sendFeedback() {
        if (this.feedback) {
            this.sending = true;
            this.$http.post(this.apiEndpoint + '/feedback', {feedback: this.feedback});
            this.toastr.success('Thank you!');
        }
    }
}
