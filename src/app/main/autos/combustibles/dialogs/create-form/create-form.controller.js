(function() {
  'use strict';

  angular
    .module('app.autos.combustibles')
    .controller('CreateFormCombustiblesController', CreateFormCombustiblesController);

  /** @ngInject */
  function CreateFormCombustiblesController($scope, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.combustible = {};


    function save() {
      $mdDialog.hide(vm.combustible);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
