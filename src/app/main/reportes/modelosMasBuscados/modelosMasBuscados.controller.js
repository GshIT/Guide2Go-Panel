(function() {
  'use strict';

  angular
    .module('app.reportes.modelosMasBuscados')
    .controller('ModelosMasBuscadosController', ModelosMasBuscadosController);

  /** @ngInject */
  function ModelosMasBuscadosController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, modelos, DtOptions
  ) {

    var vm = this;

    vm.modelos = modelos;
    console.log(modelos);

    vm.dtOptions = DtOptions;

  }
})();
