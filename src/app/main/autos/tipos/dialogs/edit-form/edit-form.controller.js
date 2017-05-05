(function() {
  'use strict';

  angular
    .module('app.autos.tipos')
    .controller('EditFormTiposController', EditFormTiposController);

  /** @ngInject */
  function EditFormTiposController(tipo, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.tipo = tipo;


    function update() {
      $mdDialog.hide(vm.tipo);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
