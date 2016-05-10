export class LiveService {
    constructor(apiEndpoint, AuthService, flags, $q, $log) {
        'ngInject';

        this.apiEndpoint = apiEndpoint;
        this.AuthService = AuthService;
        this.$log = $log;
        this.$q = $q;

        this.enabled = flags.socketIO;
    }

    connect() {
        if (this.$promise) {
            return this.$promise;
        }
        var defer = this.$q.defer();
        this.$promise = defer.promise;

        if (!this.enabled) {
            defer.reject(false);
            return this.$promise;
        }

        this.socket = io.connect(this.apiEndpoint);
        this.$log.debug('connecting to ', this.apiEndpoint);
        this.socket.on('connect', () => {
            this.$log.debug('connected');
            this.socket.emit('authentication', this.AuthService.getToken());
            this.socket.on('authenticated', () => {
                 this.$log.debug('authenticated');
                 defer.resolve(true);
            });
        });

        return this.$promise;
    }

    /**
     * @param {String} event
     * @param {Function} callback
     * @return {Function} unsubscribe function
     */
    subscribe(event, cb) {
        if (this.enabled) {
            this.$log.debug(`live.sub: ${event}`);
            return this.socket.on(event, cb);
        }
        return false;
    }

    /**
     * @param {String} type
     * @return {Function} usubscribe function
     */
    subscribePrivate(type, cb) {
        if (this.enabled) {
            this.$log.debug('live.sub.private');
            return this.socket.on(`p:${type}`, cb)
        }
        return false;
    }
}

/**
 *
 * @param {LiveService} LiveService
 */
export function runLiveService(LiveService, AuthService, flags) {
    'ngInject';

    if (flags.socketIO && AuthService.hasToken()) {
        LiveService.connect();
    }
}
