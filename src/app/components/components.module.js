import './api/lb.services';
import { configApi } from './api/api.config';
import { Storage, storageConfig } from './storage.service';

angular.module('loliful.components', ['lbServices', 'LocalStorageModule'])
    .config(storageConfig)
    .config(configApi)
    .service('Storage', Storage);
