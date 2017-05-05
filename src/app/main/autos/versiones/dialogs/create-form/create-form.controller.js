(function() {
  'use strict';

  angular
    .module('app.autos.versiones')
    .controller('CreateFormVersionesController', CreateFormVersionesController);

  /** @ngInject */
  function CreateFormVersionesController($scope, $mdDialog) {
    var vm = this;

    vm.close = close;
    vm.save = save;
    vm.version = {};


    function save() {
      $mdDialog.hide(vm.version);
    }

    function close() {
      $mdDialog.cancel('closed-manually');
    }
  }


})();
