'use strict';

/* Controllers */

// angular.module('project.controllers', []).
//   controller('MyCtrl1', [function() {

//   }])
//   .controller('MyCtrl2', [function() {

//   }])
//   .controller('LoginCtrl', ["$scope", "$rootScope", "myAuthService", function($scope, $rootScope, myAuthService) {
function LoginCtrl($scope, $rootScope, myAuthService) {
  	console.log("in LoginCtrl");
    $scope.login = function() {
        // var user1 = $scope.cred.user;
        // var pass1 = $scope.cred.password;
        console.log("in signin function");
        myAuthService.auth.login('facebook', {
            rememberMe: true
        });
    }
    $scope.logout = function() {
    	myAuthService.auth.logout();
    }
    // listen for user auth events
    $rootScope.$on("login", function(event, user) {
        console.log('Ctrl login ' + user.name);
        if (user != null) {
                $scope.user = user;
                console.log($scope);
                console.log('user ' + user.name);
            }
        
    })
    $rootScope.$on("loginError", function(event, error) {
        console.log('Ctrl login error');
    })
    $rootScope.$on("logout", function(event) {
        console.log('Ctrl logout ');
        $scope.user = null;
    })
    console.log("end of LoginCtrl");
};

function ListCtrl($scope, Projects) {
  $scope.projects = Projects;
}
 
function CreateCtrl($scope, $location, $timeout, Projects) {
  $scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  }
}



function EditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + $routeParams.projectId, $scope, 'remote', {}).
  then(function() {
    $scope.project = angular.copy($scope.remote);
    $scope.project.$id = $routeParams.projectId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.project);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.project);
      $location.path('/');
    };
  });
}



// Eqiupment Controllers

function EquipViewCtrl($scope, Equipment) {
  $scope.equipment = Equipment;
}

function EquipCreateCtrl($scope, $location, $timeout, Equipment) {
  $scope.save = function() {
    Equipment.add($scope.equipment, function() {
      $timeout(function() { $location.path('/equipment'); });
    });
  }
}

function EquipEditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + $routeParams.equipId, $scope, 'remote', {}).
  then(function() {
    $scope.equipment = angular.copy($scope.remote);
    $scope.equipment.$id = $routeParams.equipId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.equipment);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/equipment');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.equipment);
      $location.path('/equipment'); // TODO make this "last" rather than specific url
    };
  });
}

// Exercises controllers

function ExerciseViewCtrl($scope, Exercises, Equipment) {
  $scope.exercise = Exercises;
  $scope.equipment = Equipment; // exercises may depend on equipment
}

function ExerciseCreateCtrl($scope, $location, $timeout, Exercises) {
  $scope.save = function() {
    Exercises.add($scope.exercise, function() {
      $timeout(function() { $location.path('/exercise'); });
    });
  }
}

function ExerciseEditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + $routeParams.exerciseId, $scope, 'remote', {}).
  then(function() {
    $scope.exercise = angular.copy($scope.remote);
    $scope.exercise.$id = $routeParams.exerciseId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.exercise);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/exercise');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.exercise);
      $location.path('/exercises'); // TODO make this "last" rather than specific url
    };
  });
}


// Workouts controllers (canned workouts)

function WorkoutsViewCtrl($scope, Workouts) {
  $scope.workouts = Workouts;
}

function WorkoutsCreateCtrl($scope, $location, $timeout, Workouts) {
  $scope.save = function() {
    Workouts.add($scope.workouts, function() {
      $timeout(function() { $location.path('/workouts'); });
    });
  }
}

function WorkoutsEditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
  angularFire(fbURL + $routeParams.workoutsId, $scope, 'remote', {}).
  then(function() {
    $scope.workouts = angular.copy($scope.remote);
    $scope.workouts.$id = $routeParams.workoutsId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.workouts);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/workouts');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.workouts);
      $location.path('/workouts'); // TODO make this "last" rather than specific url
    };
  });
}



//temporarily hardcode the user id, wire up to auth later
function UsersEditCtrl($scope, $location, angularFire, fbURL) {
  angularFire(fbURL + 'users/1', $scope, 'remote', {}).
// function UsersEditCtrl($scope, $location, $routeParams, angularFire, fbURL) {
//   angularFire(fbURL + 'users/' + $routeParams.userId, $scope, 'remote', {}).

  then(function() {
    $scope.user = angular.copy($scope.remote);
    $scope.user.$id = 1;
//     $scope.user.$id = $routeParams.userId;
    $scope.save = function() {
      $scope.remote = angular.copy($scope.user);
    };
    $scope.saveAndWorkout = function() {
      $scope.remote = angular.copy($scope.user);
      $location.path('/workout'); 
    };
  });
}

function DoWorkoutCtrl($scope, $location, angularFire, fbURL) {
  angularFire(fbURL + 'users/1', $scope, 'remote', {}).
  then(function() {
    $scope.user = angular.copy($scope.remote);
    $scope.user.$id = 1;
    $scope.save = function() {
      $scope.remote = angular.copy($scope.user);
    };
    $scope.getDate = function() {
      return Date.now(); 
    };
  });
}
// function AuthCtrl($scope, $location, angularFire, fbURL) {
//  var cxn = angularFire(fbURL + $routeParams.projectId + '/users', $scope, 'remote', {});
//     // FirebaseAuth callback
//     $scope.authCallback = function(error, user) {
//         if (error) {
//             console.log('error: ', error.code);
//             /*if (error.code === 'EXPIRED_TOKEN') {
//                 $location.path('/');
//             }*/
//         } else if (user) {
//             console.log('Logged In', $scope);
//             // Store the auth token
//             localStorage.setItem('token', user.firebaseAuthToken);
//             $scope.isLoggedIn = true;

//             $scope.userId = user.id;

//             // Set the userRef and add user child refs once
//             $scope.userRef = cxn.child(user.id);
//             $scope.userRef.once('value', function(data) {
//                 // Set the userRef children if this is first login
//                 var val = data.val();
//                 var info = {
//                     userId: user.id,
//                     name: user.name
//                 };
//                 // Use snapshot value if not first login
//                 if (val) {
//                     info = val;
//                 }
//                 $scope.userRef.set(info); // set user child data once
//             });

//             $location.path('/user/' + $scope.userRef.name());
//         } else {
//             localStorage.clear();
//             $scope.isLoggedIn = false;
//             $location.path('/');
//         }
//     };

//     var authClient = new FirebaseAuthClient(fireFactory.firebaseRef('users'), $scope.authCallback);

//     $scope.login = function(provider) {
//         $scope.token = localStorage.getItem('token');
//         var options = {
//             'rememberMe': true
//         };
//         provider = 'facebook';

//         if ($scope.token) {
//             console.log('login with token', $scope.token);
//             fireFactory.firebaseRef('users').auth($scope.token, $scope.authCallback);
//         } else {
//             console.log('login with authClient');
//             authClient.login(provider, options);
//         }
//     };

//     $scope.logout = function() {
//         localStorage.clear();
//         authClient.logout();
//         $location.path('/');
//     };
// }
