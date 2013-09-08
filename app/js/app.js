'use strict';


// App level module which depends on filters, and services

angular.module('project', ['firebase', 'ui.bootstrap',
	'project.filters', 
	'project.services', 
	'project.directives',
  'FIREBASE_URL']).
  //value('fbURL', 'https://fit4.firebaseio.com/').
  factory('Projects', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'projects/'));
  }).
  factory('Users', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'users/'));
  }).
  factory('Equipment', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'equipment/'));
  }).
  factory('Exercises', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'exercises/'));
  }).
  factory('Workouts', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'workouts/'));
  }).
  factory('WorkoutLog', function(angularFireCollection, FIREBASE_URL) {
    return angularFireCollection(new Firebase(FIREBASE_URL + 'workoutlog/'));
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
      when('/workout/:userId/:workoutId', {controller:'WorkoutLogCtrl', templateUrl:'partials/doworkout.html'}).
      otherwise({redirectTo:'/'});
  });
 
