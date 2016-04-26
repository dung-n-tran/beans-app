angular.module('app.services', ['firebase'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.constant('FirebaseUrl', 'https://beans-app.firebaseio.com/')

.service('rootRef', ['FirebaseUrl', Firebase])

.factory('Auth', function(rootRef, $firebaseAuth) {
  return $firebaseAuth(rootRef);
})

.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl) {  
  var usersRef = new Firebase(FirebaseUrl+'users');
  var users = $firebaseArray(usersRef);
  var Users = {
  	getProfile: function(uid){
      return $firebaseObject(usersRef.child(uid));
  },
  	getName: function(uid){
    return users.$getRecord(uid).name;
  },
    getGravatar: function(uid){
  return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
  },
    all: users
  };
  return Users;
})

.factory('Articles', function($firebaseArray, FirebaseUrl) {
  var articlesRef = new Firebase(FirebaseUrl+'articles');
  var articles = $firebaseArray(articlesRef);
  var Artices = {
  	addAnArticle: function(article) {
    articles.$add({'content': article.content});
    },
  	all: articles
  };
  return Articles;
})
// function Auth(rootRef, $firebaseAuth) {
//   return $firebaseAuth(rootRef);
// }
// Auth.$inject = ['rootRef', '$firebaseAuth'];
