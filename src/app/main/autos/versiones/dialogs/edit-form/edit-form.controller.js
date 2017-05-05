(function() {
  'use strict';

  angular
    .module('app.autos.versiones')
    .controller('EditFormVersionesController', EditFormVersionesController);

  /** @ngInject */
  function EditFormVersionesController(version, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.update = update;
    vm.version = version;


    function update() {
      $mdDialog.hide(vm.version);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
