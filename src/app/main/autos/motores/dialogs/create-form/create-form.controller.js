(function() {
  'use strict';

  angular
    .module('app.autos.motores')
    .controller('CreateFormMotoresController', CreateFormMotoresController);

  /** @ngInject */
  function CreateFormMotoresController($scope, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.motor = {};


    function save() {
      $mdDialog.hide(vm.motor);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
