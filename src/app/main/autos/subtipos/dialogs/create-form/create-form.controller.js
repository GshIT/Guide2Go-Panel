(function() {
  'use strict';

  angular
    .module('app.autos.subtipos')
    .controller('CreateFormSubTiposController', CreateFormSubTiposController);

  /** @ngInject */
  function CreateFormSubTiposController($scope, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.subtipo = {};


    function save() {
      $mdDialog.hide(vm.subtipo);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
