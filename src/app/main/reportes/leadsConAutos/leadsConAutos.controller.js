(function() {
  'use strict';

  angular
    .module('app.reportes.leadsConAutos')
    .controller('LeadsConAutosController', LeadsConAutosController);

  /** @ngInject */
  function LeadsConAutosController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, autosElegidosPorLeads, DtOptions
  ) {
    var vm = this;

    vm.autosElegidosPorLeads = autosElegidosPorLeads;

    vm.dtOptions = DtOptions;

  }
})();
