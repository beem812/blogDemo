import angular from 'angular';

//Create the module wher our functionaity can attach to
let authModule = angular.module('app.auth', []);
//stuff
//Include our UI-Router config settings
import AuthConfig from './auth.config';
authModule.config(AuthConfig);

// Include controllers
import AuthCtrl from './auth.controller';
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
