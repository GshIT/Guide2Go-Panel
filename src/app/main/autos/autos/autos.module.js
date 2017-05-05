(function() {
  'use strict';

  angular
    .module('app.autos.autos', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.autos', {
      url: '/autos',
      resolve: {
        autos: function(api) {
          return api.autos.get().then(function(res) {
            return res.data;
          });
        },
        marcas: function(api) {
          return api.marcas.get().then(function(res) {
            return res.data;
          });
        },
        tipos: function(api) {
          return api.tipos.get().then(function(res) {
            return res.data;
          });
        },
        subtipos: function(api) {
          return api.subtipos.get().then(function(res) {
            return res.data;
          });
        },
        versiones: function(api) {
          return api.versiones.get().then(function(res) {
            return res.data;
          });
        },
        combustibles: function(api) {
          return api.combustibles.get().then(function(res) {
            return res.data;
          });
        },
        motores: function(api) {
          return api.motores.get().then(function(res) {
            return res.data;
          });
        },
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/autos/autos/autos.html',
          controller: 'AutosController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('autos.autos', {
        title : 'Autos',
        state : 'app.autos',
        // icon:   'icon-car',
        weight: 1
    });
  }

})();
