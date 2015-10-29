import './api/lb.services';

import { Storage, storageConfig } from './storage.service';

angular.module('loliful.components', ['lbServices', 'LocalStorageModule'])
    .config(storageConfig)
    .service('Storage', Storage);
