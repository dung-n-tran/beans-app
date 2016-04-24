angular.module('app.controllers', [])
  
//.controller('splashScreenCtrl', function($scope) {
//
//})

.controller('loginCtrl', function($scope, $ionicModal, $location, Auth, rootRef, $rootScope) {    

  $scope.login = function(user) {
  	$scope.error = null;
  	if ( !user ) {
  	  	$scope.error = 'Please fill details';  	  	
  	} else {
  	  Auth.$authWithPassword( {
  	  email: user.email,
  	  password: user.passwordForLogin
  	  }, { rememberMe: true })
  	    .then(function(/*authData*/) {
  	     // rootRef.child("users").child(authData.uid).once('value', function (snapshot) {
         //        var val = snapshot.val();
         //        // To Update AngularJS $scope either use $apply or $timeout
         //        $scope.$apply(function () {
         //            $rootScope.displayName = val;
         //        });
         //    });
  	      $location.path('/tabs/read');
  	    })
  	    .catch(function(error) {
  	      $scope.error = error.message;		  
		})
  		console.log("login() called.")
	}
  }	

  $scope.toSignUpPage = function() {
  	$location.path('/signup');
  }

  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }
})
   
.controller('publishCtrl', function($scope, user) {
  $scope.user = user;
})
   
.controller('profileCtrl', function($scope, Auth, $location, user) {
	console.log(user);
  $scope.user = user;
  $scope.logout = function() {
  		console.log(Auth.$getAuth());
        Auth.$unauth();
        $location.path('/login');
      };
})
      
.controller('readCtrl', function($scope) {

})
   
.controller('createANewAccountCtrl', function($scope, Auth, rootRef, $location) {
  $scope.createUser = function(user) {
  	console.log("createUser() called.");
  	console.log(user);
  	if (assertValidAccountProps(user)) {
  		Auth.$createUser({email: user.email, password: user.password})
  		  .then(function() {
  		  	return Auth.$authWithPassword({email: user.email, password: user.password})
  		  })
  		  .then(function(userData) {
  		  	rootRef.child("users").child(userData.uid).set({
                email: user.email,
                name: user.name,
                password: user.password
            });
  		  })
  		  .then(function(/* user */) {
            // redirect to the reading page
            $location.path('/tabs/read');
          }, function(error) {
          	console.log(error);
            $scope.error = errMessage(error);
          }); 		  
  	};
  }
  function assertValidAccountProps(user) {

  	  if ( !user ) {
  	  	$scope.error = 'Please fill details';  	  	
  	  }
      if( user && !user.email ) {
        $scope.error = 'Please enter a valid email address';
      }
      else if( user && !user.password ) {
        $scope.error = 'Please enter a password';
      }      
      return !$scope.error;
    }

  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }
})

.controller('pageCtrl', function($scope) {

})