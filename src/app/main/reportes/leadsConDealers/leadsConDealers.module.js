(function() {
  'use strict';

  angular
    .module('app.reportes.leadsConDealers', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.leadsConDealers', {
      url: '/reportes/leadsConDealers',
      resolve: {
        asignacionesLeadParaDealers: function(api) {
          return api.reportes.asignacionesLeadParaDealers().then(function(res) {
            return res.data;
          });
        },
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/reportes/leadsConDealers/leadsConDealers.html',
          controller: 'LeadsConDealersController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('reportes.leadsConDealers', {
        title : 'Leads Con Dealers',
        state : 'app.leadsConDealers',
        weight: 1
    });
  }

})();
