angular.module('app.services', ['firebase'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.constant('FirebaseUrl', 'https://beans-app.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.factory('Auth', Auth)
;

function Auth(rootRef, $firebaseAuth) {
  return $firebaseAuth(rootRef);
}
Auth.$inject = ['rootRef', '$firebaseAuth'];
