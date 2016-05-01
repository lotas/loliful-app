/* global FastClick */

export function attachFastclick() {
    if (angular.isDefined(FastClick)) {
        FastClick.attach(document.body);
    }
}
