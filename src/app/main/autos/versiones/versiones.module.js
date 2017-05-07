(function() {
  'use strict';

  angular
    .module('app.autos.versiones', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput','ngFileUpload'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.versiones', {
      url: '/versiones',
      resolve: {
        paradas: function(api) {
          return api.paradas.get().then(function(res) {
            return res.data
          });
        },
        versiones: function(api) {
          return api.versiones.get().then(function(res) {
            return res.data
          });
        }
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/autos/versiones/versiones.html',
          controller: 'VersionesController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('autos.versiones', {
        title : 'Audios',
        state : 'app.versiones',
        weight: 1
    });
  }

})();
