(function() {
  'use strict';

  angular
    .module('app.reportes.leadsConAutos', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.leadsConAutos', {
      url: '/reportes/leadsConAutos',
      resolve: {
        autosElegidosPorLeads: function(api) {
          return api.reportes.autosElegidosPorLeads().then(function(res) {
            return res.data;
          });
        },
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/reportes/leadsConAutos/leadsConAutos.html',
          controller: 'LeadsConAutosController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('reportes.leadsConAutos', {
        title : 'Autos Escogidos por Leads',
        state : 'app.leadsConAutos',
        weight: 1
    });
  }

})();
