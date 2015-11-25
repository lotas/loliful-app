const bestThings = [
    'Pizza Deluxe',
    'me',
    'you',
    'three cold beers',
    'Worms 2 Armageddon',
    'that world'
];

const placeholders = [
    'You guys are doing a great job, but...',
    'I like sleeping after lunch, but...',
    'I like crying when I laugh, but this just too funny...',
    'No one learned from your mistake, We let our profit s go to waste'
];

function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}


export class PageAboutController {
    /**
     *
     * @param {User} User
     * @param $log
     */
    constructor(User, $log) {
        'ngInject';

        this.User = User;
        this.$log = $log;

        this.bestThing = random(bestThings);
        this.placeholder = random(placeholders);
    }

    sendFeedback() {
    }
}
