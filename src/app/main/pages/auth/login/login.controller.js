(function() {
  'use strict';

  angular.module('app.pages.auth.login').controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $timeout, $http, jwtHelper) {
    var vm = this;

    vm.processing = false;
    vm.login = login;

    function login() {
      let data = {
        email: this.form.email,
        password: this.form.password
      };
      let req = {
            method: 'POST',
            url: 'http://digitalcook.info:8000/api/login',
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            data: data
          }
      let tokenD;

      $http(req).then(function successCallback(response){
        tokenD = jwtHelper.decodeToken(response.data.token);
        if(tokenD.user_type == 1){
          localStorage.setItem("token", response.data.token);
          console.log('request successfull & token stored');
          vm.processing = true;
          $timeout(function() {
                  this.go('app.autos');
                  vm.processing = false;
                }.bind($state), 10);
        }
        else{
          console.log('no tiene los suficientes privilegios');
        }

      }, function errorCallback(response){
        console.log(response);
      });

    }
  }
})();


/*
vm.processing = true;
$timeout(function() {
        this.go('app.autos');
        vm.processing = false;
      }.bind($state), 1000);*/