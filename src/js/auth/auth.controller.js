class AuthCtrl {
  constructor(User, $state){
    'ngInject';
    this._User = User;
    this._$state = $state;

    this.title=$state.current.title;
    this.authType = $state.current.name.replace('app.', '');
  }

  submitForm(){
    //temporarily disabling the login form while authentication is
    //determined
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) =>{
        //redirecting to home page on successful authentication
        this._$state.go('app.home');
      },
      (err) => {
        this.isSubmitting = false;
        //putting errors into an object to be displayed to the user
        this.errors = err.data.errors;
      }
    )
  }
}
export default AuthCtrl;
