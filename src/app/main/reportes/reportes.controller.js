(function() {
  'use strict';

  angular
    .module('app.reportes')
    .controller('ReportesController', ReportesController);

  /** @ngInject */
  function ReportesController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope,
    asignacionesLeadParaDealers, autosElegidosPorLeads
  ) {

    var vm = this;

    console.log(asignacionesLeadParaDealers);
    console.log(autosElegidosPorLeads);
    vm.autosElegidosPorLeads = autosElegidosPorLeads;

    vm.autos = [
      {id: 1, nombre: 'uno'},
      {id: 2, nombre: 'dos'},
      {id: 3, nombre: 'tres'},
      {id: 4, nombre: 'cuatro'},
    ];

    vm.elevacion = [];

  }
})();
