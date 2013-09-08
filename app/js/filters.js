'use strict';

/* Filters */

angular.module('project.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('onlyActive', function (exercise) {
  	console.log("in filter");
  	console.log(exercise);
  	var activeList = $scope.workout.routine;
  	console.log(activeList);
  	if (activeList.contains(exercise)) {
  		if(activeList[exercise]) {
  			return true;
  		}
  		else {return false;}
  	}
  	else {return false;}

  });
