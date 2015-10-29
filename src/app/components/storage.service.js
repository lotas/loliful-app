export class Storage {
    constructor(localStorageService) {
        'ngInject';

        this.storage = localStorageService.isSupported ?
                        localStorageService :
                        localStorageService.cookie;
    }

    get(key) {
        return this.storage.get(key);
    }

    set(key, value) {
        return this.storage.set(key, value);
    }

    remove(...args) {
        return this.storage.remove(...args);
    }

    clearAll() {
        return this.storage.clearAll()
    }
}

export function storageConfig(localStorageServiceProvider) {
    'ngInject';

    localStorageServiceProvider.setPrefix('app')
        .setStorageType('localStorage')
        .setNotify(true, true)
}
