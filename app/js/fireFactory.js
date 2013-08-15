'use strict';
angular.module('fireFactory').
factory('fireFactory', [
function fireFactory() {
    return {
        firebaseRef: function(path) {
            var baseUrl = 'https://fit4.firebaseio.com';
            path = (path !== '') ?  baseUrl + '/' + path : baseUrl;
            return new Firebase(path);
        }
    };
}
]);