export function InitialsFilter() {
    return function(name) {
        var initials = name.replace(/[^A-Z]+/g, '');

        if (initials.length > 0) {
            return initials.substr(0, 2)
        }

        return name.substr(0, 2);
    };
}
