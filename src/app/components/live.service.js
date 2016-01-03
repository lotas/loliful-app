export class LiveService {
    constructor(apiEndpoint, AuthService, $q, $log) {
        'ngInject';

        this.apiEndpoint = apiEndpoint;
        this.AuthService = AuthService;
        this.$log = $log;
        this.$q = $q;
    }

    connect() {
        if (this.$promise) {
            return this.$promise;
        }
        var defer = this.$q.defer();
        this.$promise = defer.promise;

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
        this.$log.debug(`live.sub: ${event}`);
        return this.socket.on(event, cb);
    }

    /**
     * @param {String} type
     * @return {Function} usubscribe function
     */
    subscribePrivate(type, cb) {
        this.$log.debug('live.sub.private');
        return this.socket.on(`p:${type}`, cb)
    }
}

/**
 *
 * @param {LiveService} LiveService
 */
export function runLiveService(LiveService, AuthService) {
    'ngInject';

    if (AuthService.hasToken()) {
        LiveService.connect();
    }
}
