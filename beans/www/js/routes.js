angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('splashScreen', {
    url: '/splash',
    templateUrl: 'templates/splashScreen.html',
    controller: 'splashScreenCtrl'
  })

  .state('tabsController.publish', {
    url: '/publish',
    views: {
      'tab2': {
        templateUrl: 'templates/publish.html',
        controller: 'publishCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    views: {
      'tab3': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
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
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('createANewAccount', {
    url: '/signup',
    templateUrl: 'templates/createANewAccount.html',
    controller: 'createANewAccountCtrl'
  })

$urlRouterProvider.otherwise('/splash')

  

});