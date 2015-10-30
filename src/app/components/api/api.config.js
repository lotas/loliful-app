export function configApi(LoopBackResourceProvider, apiEndpoint) {
    'ngInject';

    // Use a custom auth header instead of the default 'Authorization'
    // LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    LoopBackResourceProvider.setUrlBase(apiEndpoint);

}
