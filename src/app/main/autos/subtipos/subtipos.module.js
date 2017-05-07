(function() {
  'use strict';

  angular
    .module('app.autos.subtipos', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.subtipos', {
      url: '/subtipos',
      resolve: {
        zonas: function(api) {
          return api.zonas.get().then(function(res) {
            return res.data
          });
        },
        subtipos: function(api) {
          return api.subtipos.get().then(function(res) {
            return res.data
          });
        }
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/autos/subtipos/subtipos.html',
          controller: 'SubTiposController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('autos.subtipos', {
        title : 'SubZona',
        state : 'app.subtipos',
        weight: 1
    });
  }

})();
