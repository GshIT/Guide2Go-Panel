(function() {
  'use strict';

  angular
    .module('app.autos.combustibles')
    .controller('EditFormCombustiblesController', EditFormCombustiblesController);

  /** @ngInject */
  function EditFormCombustiblesController(combustible, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.combustible = combustible;


    function update() {
      $mdDialog.hide(vm.combustible);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
