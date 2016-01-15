export function TimeAgoFilter($window) {
    'ngInject';

    return function(timeString) {
        return $window.moment(timeString).fromNow();
    };
}
