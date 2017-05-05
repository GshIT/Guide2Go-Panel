(function() {
  'use strict';

  angular
    .module('app.autos.subtipos')
    .controller('EditFormSubTiposController', EditFormSubTiposController);

  /** @ngInject */
  function EditFormSubTiposController(subtipo, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.subtipo = subtipo;


    function update() {
      $mdDialog.hide(vm.subtipo);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
