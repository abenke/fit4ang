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
  angularFire(new Firebase(fbURL + $routeParams.projectId), $scope, 'remote', {}).
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
  angularFire(new Firebase(fbURL + 'equipment/' + $routeParams.equipId), $scope, 'remote', {}).
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

function ExerciseViewCtrl($scope, Exercises) {
  $scope.exercise = Exercises;
}

function ExerciseCreateCtrl($scope, $location, $timeout, Exercises, Equipment) {
  $scope.equipment = Equipment;
  $scope.save = function() {
    Exercises.add($scope.exercise, function() {
      $timeout(function() { $location.path('/exercises'); });
    });
  }
}

function ExerciseEditCtrl($scope, $location, $routeParams, angularFire, fbURL, Equipment) {
  angularFire(new Firebase(fbURL + 'exercises/' + $routeParams.exerciseId), $scope, 'remote', {}).
  then(function() {
    $scope.equipment = Equipment;
    //console.log($scope.equipment);
    $scope.exercise = angular.copy($scope.remote);
    $scope.exercise.$id = $routeParams.exerciseId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.exercise);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/exercises');
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

function WorkoutsEditCtrl($scope, $location, $routeParams, angularFire, fbURL, Exercises) {
  angularFire(new Firebase(fbURL + 'workouts/' + $routeParams.workoutsId), $scope, 'remote', {}).
  then(function() {
    $scope.exercises = Exercises
    $scope.workouts = angular.copy($scope.remote);
    $scope.workouts.$id = $routeParams.workoutsId;
    if(typeof $scope.workouts.routine === 'undefined') {
      $scope.workouts.routine = {};
      console.log('routine is null');
    }
    //$scope.workouts.routine = {"-J1664j1nLSnsoIi4K6S":true,"-J11F9TwX4-KW2l_oxN4":true, "-J1CXxf0LvtIiOEnuYbS":true};
    $scope.$watch('workouts.routine', function() {
      console.log($scope.workouts.routine);
    });
    $scope.test = function(input) {
      console.log(input);
    };
    $scope.hasExercise = function(ex) {
      console.log(ex + ' ' + typeof($scope.workouts.routine[ex]))
      return typeof($scope.workouts.routine[ex]) != 'undefined' && $scope.workouts.routine[ex] != false;
    }
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.workouts);
    };
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/workouts');
    };
    $scope.save = function() {
      // save exercises
      //save order of exercises
      $scope.remote = angular.copy($scope.workouts);
      $location.path('/workouts'); // TODO make this "last" rather than specific url
    };
    $scope.addExercise = function() {
      // TODO: add here
    };
    $scope.removeExercise = function() {
      // TODO
    }
  });
}


function UsersEditCtrl($scope, $location, $routeParams, angularFire, fbURL, Workouts) {
  if($scope.user === null) {
    console.log("no user found, not logged in?");
  }
  else {
    var theid= '1585353979'; 
    //console.log($scope.user.id);
    angularFire(new Firebase(fbURL + 'users/' + theid), $scope, 'remote', {}).
    then(function() {
      $scope.userprofile = angular.copy($scope.remote);
      $scope.userprofile.$id = theid;
      $scope.save = function() {
        $scope.remote = angular.copy($scope.userprofile);
      };
      $scope.saveAndWorkout = function(workoutId) {
        $scope.remote = angular.copy($scope.userprofile);
        $location.path('/workout/' + theid + '/' + workoutId); 
      };
      $scope.workouts = Workouts;
    });
  }
} 


function UserLoginCtrl($scope, $location, $routeParams, angularFire, angularFireAuth, fbURL, Workouts) {
  var url = fbURL;
  angularFireAuth.initialize(new Firebase(url), {scope: $scope, name: "user"});
  //var ref = new Firebase(url);
  //$scope.users = angularFireCollection(ref);
  console.log("in controller");
  $scope.login = function() {
    console.log("trying login");
    angularFireAuth.login("facebook");
  }
  $scope.logout = function() {
    angularFireAuth.logout();
  }
  $scope.$on("angularFireAuth:login", function(evt, user) {
    console.log("user logged in");
  });
  $scope.$on("angularFireAuth:logout", function(evt) {
    console.log("User logged out.");
  });
  $scope.$on("angularFireAuth:error", function(evt, err) {
    console.log("There was an error during authentication. " + err)
  });

//   angularFire(new Firebase(fbURL + 'users/1'), $scope, 'remote', {}).
//   then(function() {
//     $scope.user = angular.copy($scope.remote);
//     $scope.user.$id = 1;
// //     $scope.user.$id = $routeParams.userId;
//     $scope.save = function() {
//       $scope.remote = angular.copy($scope.user);
//     };
//     $scope.saveAndWorkout = function(workoutId) {
//       $scope.remote = angular.copy($scope.user);
//       //$location.path('/workout/' + $routeParams.userId + '/' + workoutId); 
//       $location.path('/workout/1/' + workoutId); 
//     };
//     $scope.workouts = Workouts;
//   });
} 

function WorkoutLogCtrl($scope, $location, $routeParams, angularFireCollection, angularFire, fbURL, Exercises) {
  angularFire(new Firebase(fbURL + 'workoutlog/'+ $routeParams.userId), $scope, 'remote', {}).
  then(function() {
    //$scope.routine={"yi":2};
    $scope.workoutlog = angular.copy($scope.remote);
    //var blah = angularFireCollection(fbURL + 'workoutlog/'+ $routeParams.userId + '/-J1CYPqG4EHFBKon5hGE');

//get workout
    $scope.workoutId = $routeParams.workoutId;


    $scope.workout = angularFireCollection(new Firebase(fbURL + 'workouts/' + $routeParams.workoutId), function () {
      $scope.loaded = true;
      console.log("LOADED!");
      console.log($scope.workout.routine);
    });


    // if(typeof $scope.workout.routine === 'undefined') {
    //   $scope.workout.routine = {"-J1664j1nLSnsoIi4K6S":true};
    //   console.log('routine is null');
    // }

    // $scope.workout.on('value', function(snapshot) {
    //   if(snapshot.val() === null) {
    //     alert('Workout does not exist.');
    //   } else {
    //     console.log("start===");
    //     console.log(snapshot.val());
    //     var workoutName = snapshot.val().name;
    //     $scope.routine = snapshot.val().routine;
    //     console.log("end====");
    //   }
    // });



    //$scope.workouts.routine = {"-J1664j1nLSnsoIi4K6S":true,"-J11F9TwX4-KW2l_oxN4":true, "-J1CXxf0LvtIiOEnuYbS":true};
    
    console.log($scope.workout);

//loop thorugh each past exercise for this user, get last rep/weight
    $scope.exData = [];

    for (var exercise in $scope.workoutlog) {
      var a = new Firebase(fbURL + 'workoutlog/'+ $routeParams.userId + '/' + exercise).limit(1);
      a.on('child_added', function(ex) {
        $scope.exData.push(ex.val());
        console.log($scope.exData)
      });
    }


    $scope.exercises = Exercises;


    //{ id:'-J11F9TwX4-KW2l_oxN4', exerciseId:'-J11F9TwX4-KW2l_oxN4', date:'2013-08-30', weight:'50', reps:'10' }

    // load past workout history to get last rep/weight; if none, assume 0

    // filter workout list to show only this workout's exercises

    // add save method to persist each completed exercise

    
    $scope.save = function() {
      $scope.remote = angular.copy($scope.workoutlog);
    };
    $scope.getDate = function() {
      return Date.now(); 
    };
    $scope.finishWorkout = function() {
      return null;
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
