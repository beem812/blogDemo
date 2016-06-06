import authInterceptor from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';


  $httpProvider.interceptors.push(authInterceptor);

  /*
    If you don't want hashbang routing, uncomment this line.
    Our tutorial will be using hashbang routing though :)
  */
  // $locationProvider.html5Mode(true);

//every state change within the app will go through this state provider first
//before proceeding to the specific page. This state provider also includes a
//resolve function that checks the authentication of the user meaning that
//the user identity will always be looked in to prior to showing new content.
  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    // checks user authentication
    resolve: {
      auth: function(User) {
        return User.verifyAuth();
      }
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
