'use strict';


// App level module which depends on filters, and services

angular.module('project', ['firebase', 'ui.bootstrap',
	'project.filters', 
	'project.services', 
	'project.directives']).
  value('fbURL', 'https://fit4.firebaseio.com/').
  factory('Projects', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'projects/');
  }).
  factory('Users', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'users/');
  }).
  factory('Equipment', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'equipment/');
  }).
  factory('Exercises', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'exercises/');
  }).
  factory('Workouts', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'workouts/');
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:UsersEditCtrl, templateUrl:'partials/main.html'}).
      when('/equipment', {controller:EquipViewCtrl, templateUrl:'partials/equip_list.html'}).
      when('/exercises', {controller:ExerciseViewCtrl, templateUrl:'partials/exercise_list.html'}).
      when('/workouts', {controller:WorkoutsViewCtrl, templateUrl:'partials/workouts_list.html'}).
      when('/edit/:projectId', {controller:EditCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:'CreateCtrl', templateUrl:'partials/detail.html'}).
      when('/login', {controller:'LoginCtrl', templateUrl:'partials/login.html'}).
      when('/create/equipment', {templateUrl: 'partials/equip_detail.html', controller: 'EquipCreateCtrl'}).
      when('/edit/equipment/:equipId', {templateUrl: 'partials/equip_detail.html', controller: 'EquipEditCtrl'}).
      when('/create/exercise', {templateUrl: 'partials/exercise_detail.html', controller: 'ExerciseCreateCtrl'}).
      when('/edit/exercise/:exerciseId', {templateUrl: 'partials/exercise_detail.html', controller: 'ExerciseEditCtrl'}).
      when('/create/workouts', {templateUrl: 'partials/workouts_detail.html', controller: 'WorkoutsCreateCtrl'}).
      when('/edit/workouts/:workoutsId', {templateUrl: 'partials/workouts_detail.html', controller: 'WorkoutsEditCtrl'}).
      when('/workout', {controller:'DoWorkoutCtrl', templateUrl:'partials/doworkout.html'}).
      otherwise({redirectTo:'/'});
  });
 
