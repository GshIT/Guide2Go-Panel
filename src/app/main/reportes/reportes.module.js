(function() {
  'use strict';

  angular
    .module('app.reportes', [
      'app.reportes.leadsConDealers',
      'app.reportes.marcasMasBuscadas',
      'app.reportes.modelosMasBuscados',
      'app.reportes.leadsConAutos',
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {

    msNavigationServiceProvider.saveItem('reportes', {
        title : 'Reportes',
        weight: 3
    });
  }

})();
