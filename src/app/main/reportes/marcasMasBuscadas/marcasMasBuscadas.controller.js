(function() {
  'use strict';

  angular
    .module('app.reportes.marcasMasBuscadas')
    .controller('MarcasMasBuscadasController', MarcasMasBuscadasController);

  /** @ngInject */
  function MarcasMasBuscadasController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, marcas, DtOptions
  ) {

    var vm = this;

    vm.marcas = marcas;
    console.log(marcas);

    vm.dtOptions = DtOptions;

  }
})();
