angular.module('app.controllers', ['firebase'])
  
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
  		console.log("login() called.");      
	}
  }	

  $scope.toSignUpPage = function() {
  	$location.path('/signup');
  }

  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }
})
   
.controller('publishCtrl', function($scope, userRef, user, FirebaseUrl, $firebaseArray, $state, Upload) {
  // $scope.user = user;

  var articlesRef = new Firebase(FirebaseUrl+'articles');  
  var articles = $firebaseArray(articlesRef);
  
  $scope.submit = function(article) {
    if (!article.photo) {
      $scope.articlePhoto = null;
    } else {
      Upload.base64DataUrl(article.photo).then(function(base64Urls) {
      $scope.articlePhoto = base64Urls;
    });
    }
    
    articles.$add({
      'title': article.title,
      'description': article.description,
      'photo': $scope.articlePhoto,
      'content': article.content,
      'clientId': userRef.auth.uid,
      'clientName': user.name,
      timestamp: Firebase.ServerValue.TIMESTAMP
    });
    $state.go('tabsController.profile');
  }    
  
})

.controller('profileCtrl', function($scope, Auth, $location, user, profile, md5) {
  $scope.user = user;
  $scope.profile = profile;

  $scope.updateProfile = function(){
  $scope.profile.emailHash = md5.createHash(auth.password.email);
  $scope.profile.$save();
  };

  $scope.logout = function() {
  		console.log(Auth.$getAuth());
        Auth.$unauth();
        $location.path('/login');
      };
})
      
.controller('readCtrl', function($scope, FirebaseUrl, $firebaseArray, Users, $state) {
  var articlesRef = new Firebase(FirebaseUrl+'articles');  
  var articles = $firebaseArray(articlesRef);
  $scope.articles = articles;
  // console.log(Users.getProfile(articles[1].userId).name)
  console.log($scope.articles);
  
  $scope.openArticle = function(articleId) {    
    $state.go('page', {
      articleId: articleId
    })
  }
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
                name: user.name,
                email: user.email,
                phone: user.phone,                
                password: user.password,
                facebookUsername: user.facebookUsername,
                twitterUsername: user.twitterUsername
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

.controller('pageCtrl', function($scope, FirebaseUrl, $firebaseArray, $stateParams) {
  var articlesRef = new Firebase(FirebaseUrl+'articles');  
  var articles = $firebaseArray(articlesRef);
  
  var articleId = $stateParams.articleId;
  // $scope.getArticle = function(articleId) {
  //   var article = $scope.articles.$getRecord(articleId);  
  //   return article;
  // }
  // $scope.article = $scope.articles.$getRecord($stateParams.articleId);
  articles.$loaded().then(function(articles) {    
    $scope.article = articles.$getRecord(articleId);  
  })    
})