'use strict';


// App level module which depends on filters, and services

angular.module('project', ['firebase',
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
  factory('Workouts', function(angularFireCollection, fbURL) {
    return angularFireCollection(fbURL + 'workout/');
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:UsersEditCtrl, templateUrl:'partials/main.html'}).
      when('/equipment', {controller:EquipViewCtrl, templateUrl:'partials/equip_list.html'}).
      when('/edit/:projectId', {controller:EditCtrl, templateUrl:'partials/detail.html'}).
      when('/new', {controller:'CreateCtrl', templateUrl:'partials/detail.html'}).
      when('/login', {controller:'LoginCtrl', templateUrl:'partials/login.html'}).
      when('/create/equipment', {templateUrl: 'partials/equip_detail.html', controller: 'EquipCreateCtrl'}).
      when('/edit/equipment/:equipId', {templateUrl: 'partials/equip_detail.html', controller: 'EquipEditCtrl'}).
      when('/workout', {controller:'WorkoutCtrl', templateUrl:'partials/workout.html'}).
      otherwise({redirectTo:'/'});
  });
 
