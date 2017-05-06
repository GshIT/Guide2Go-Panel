(function() {
  'use strict';

  angular
    .module('app.autos.subtipos')
    .controller('CreateFormSubTiposController', CreateFormSubTiposController);

  /** @ngInject */
  function CreateFormSubTiposController($scope, $mdDialog, zonas) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.subtipo = {};
    
    vm.zonas = zonas;

    function save() {
      $mdDialog.hide(vm.subtipo);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
