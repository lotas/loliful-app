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

    subscribe(channel, cb) {
        this.connect().then(() => {
            this.$log.debug(`live.sub: ${channel}`);
            this.socket.on(channel, cb);
        });
    }

    subscribePrivate(type, cb) {
        this.connect().then(() => {
            this.$log.debug(`live.sub.private: ${type}`);
            this.socket.on(`ntfy:${this.AuthService.getUserId()}`, cb);
        });
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
