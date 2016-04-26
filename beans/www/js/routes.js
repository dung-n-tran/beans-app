angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

/*      .state('splashScreen', {
    url: '/splash',
    templateUrl: 'templates/splashScreen.html',
    controller: 'splashScreenCtrl'
  })
*/

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',
    resolve: {
      requireNoAuth: function($state, Auth){
        return Auth.$requireAuth().then(function(auth){
          $state.go('tabsController.read');
        }, function(error){
            return;
        });
      }
    }
  })


  .state('tabsController.publish', {
    url: '/publish',
    views: {
      'tab2': {
        templateUrl: 'templates/publish.html',
        controller: 'publishCtrl'
      }
    },
    resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        'userRef': ['Auth', function (Auth) {
          return Auth.$requireAuth().catch(function() {
            $state.go('login');
          });
        }],
        'user': function(Users, Auth){
          return Auth.$requireAuth().then(function(auth){
            return Users.getProfile(auth.uid).$loaded();
          });
        }
    //     user: function(Users, Auth){
    //     return Auth.$requireAuth().then(function(auth){
    //       return Users.getProfile(auth.uid).$loaded();
    //   });
    // }      
      }
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    },
    resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        // user: ['Auth', function (Auth) {
        //   return Auth.$requireAuth().catch(function() {
        //     $state.go('/read');
        //   });
        // }],
        // profile: ['Users', function(Users) {
        //   return Auth.$requireAuth().then(function(auth){
        //     return Users.getProfile(auth.uid).$loaded();
        //   });
        // }]
      user: function($state, Users, Auth){
        return Auth.$requireAuth().catch(function(){
          $state.go('login');
      });
    },
      profile: function(Users, Auth){
        return Auth.$requireAuth().then(function(auth){
          return Users.getProfile(auth.uid).$loaded();
      });
    }
      }

  })

  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.read', {
    url: '/read',
    views: {
      'tab1': {
        templateUrl: 'templates/read.html',
        controller: 'readCtrl'
      }
    },
    resolve: {
      // articles: function(Articles) {
      //   return Articles.
      // }
    }
  })

  .state('createANewAccount', {
    url: '/signup',
    templateUrl: 'templates/createANewAccount.html',
    controller: 'createANewAccountCtrl',
    resolve: {
      requireNoAuth: function($state, Auth){
        return Auth.$requireAuth().then(function(auth){
          $state.go('tabsController.read');
        }, function(error){
            return;
        });
      }
    }
  })

  .state('page', {
    url: '/page/:articleId',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'    
  })

$urlRouterProvider.otherwise('/login')
})
;