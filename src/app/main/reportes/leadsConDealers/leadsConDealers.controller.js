(function() {
  'use strict';

  angular
    .module('app.reportes.leadsConDealers')
    .controller('LeadsConDealersController', LeadsConDealersController);

  /** @ngInject */
  function LeadsConDealersController(
    $state, api, $document, $mdDialog, $mdToast,
    moment, utils, $timeout, $scope, asignacionesLeadParaDealers, DtOptions
  ) {
    var vm = this;

    vm.asignacionesLeadParaDealers = asignacionesLeadParaDealers;

    vm.dtOptions = DtOptions;

  }
})();
