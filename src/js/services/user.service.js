export default class User {
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';


    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http =$http;
    this._$state = $state;
    this._$q = $q;
    this.current = null;
  }

  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      // On success...
      (res) => {
        // Store the user's info for easy lookup
        this._JWT.save(res.data.user.token);
        this.current = res.data.user;

        return res;
      }
    );
  }

  update(fields) {
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields}
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    );
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, {reload: true});
  }

  verifyAuth() {
    let deferred = this._$q.defer();

    //returns false authentication if there is no JWT token
    if(!this._JWT.get()){
      deferred.resolve(false);
      return deferred.promise;
    }//end if

    //resolves deferred to true if user information is present
    if (this.current){
      deferred.resolve(true);
    } else {
      //if user information isnt present but a token is the server is
      //checked for which user belongs to that token.
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve(true);
        },
        // If an error happens, that means the user's token was invalid.
        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
        // Reject automatically handled by auth interceptor
        // Will boot them to homepage
      );
    }
    return deferred.promise;
  }//end verifyAuth

  // This function will check if the user has the right permission to see the page
  // they're on.
  ensureAuthIs(bool){
    let deferred = this._$q.defer();

    this.verifyAuth().then(
      (authValid)=>{
      if(authValid !== bool){
        //redirecting to home page
        this._$state.go('app.home')
      }else {
        deferred.resolve(true);
      }
    });
    return deferred.promise;
  }
}
