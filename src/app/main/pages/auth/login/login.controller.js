(function() {
  'use strict';

  angular.module('app.pages.auth.login').controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, $timeout) {
    var vm = this;

    vm.processing = false;
    vm.login = login;

    function login() {
      vm.processing = true;
      $timeout(function() {
        this.go('app.autos');
        vm.processing = false;
      }.bind($state), 1000);
    }
  }
})();
