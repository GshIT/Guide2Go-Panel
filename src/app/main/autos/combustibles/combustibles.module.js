(function() {
  'use strict';

  angular
    .module('app.autos.combustibles', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.combustibles', {
      url: '/combustibles',
      resolve: {
        combustibles: function(api) {
          return api.combustibles.get().then(function(res) {
            return res.data
          });
        }
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/autos/combustibles/combustibles.html',
          controller: 'CombustiblesController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('autos.combustibles', {
        title : 'Combustibles',
        state : 'app.combustibles',
        weight: 1
    });
  }

})();
