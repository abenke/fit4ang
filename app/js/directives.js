'use strict';

/* Directives */

//example "Version" directive
angular.module('project.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version + "hahah");
    };
  }]);
