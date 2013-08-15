'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('project.services', [])
  .value('version', '0.1')
  .service('myAuthService', ["$rootScope", function($rootScope) {
    var ref = new Firebase("https://fit4.firebaseio.com");
    this.auth = new FirebaseSimpleLogin(ref, function(error, user) {
        if (user) {
            console.log('username ' + user.name);
            $rootScope.$emit("login", user);
            console.log('login emit ');
        }
        else if (error) {
            $rootScope.$emit("loginError", error);
            console.log('loginError emit');
        }
        else {
            $rootScope.$emit("logout");
            console.log('logout emit');
        }   
    });

}]);
