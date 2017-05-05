(function() {
  'use strict';

  angular
    .module('app.autos.motores')
    .controller('EditFormMotoresController', EditFormMotoresController);

  /** @ngInject */
  function EditFormMotoresController(motor, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.motor = motor;


    function update() {
      $mdDialog.hide(vm.motor);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
