(function() {
  'use strict';

  angular
    .module('app.autos.marcas', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.marcas', {
      url: '/marcas',
      resolve: {
        paradas: function(api) {
          return api.paradas.get().then(function(res) {
            return res.data
          });
        },
        subzonas: function(api) {
          return api.subzonas.get().then(function(res) {
            return res.data
          });
        },
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/autos/marcas/marcas.html',
          controller: 'MarcasController as vm'
        }
      }
    });

    // Translation
    // $translatePartialLoaderProvider.addPart('app/main/pages/auth/login');

    // Navigation
    // msNavigationServiceProvider.saveItem('pages.auth', {
    //     title : 'Authentication',
    //     icon  : 'icon-lock',
    //     weight: 1
    // });
    //
    msNavigationServiceProvider.saveItem('autos.marcas', {
        title : 'Paradas',
        state : 'app.marcas',
        weight: 1
    });
  }

})();
