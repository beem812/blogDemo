function AuthConfig($stateProvider, $httpProvider){
  'ngInject';

  $stateProvider
  .state('app.login', {
    url:'/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    //Redirects user to home if the correct authentication is not received
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.register', {
    url:'/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(false);
      }
    }
  });
};

export default AuthConfig;
