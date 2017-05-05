(function() {
  'use strict';

  angular
    .module('app.reportes.modelosMasBuscados', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.modelosMasBuscados', {
      url: '/reportes/modelosMasBuscados',
      resolve: {
        modelos: function(api) {
          return api.reportes.autosElegidosPorLeads().then(function(res) {
            return res.data;
          }).then(function(data) {
            // Histogram to save models apparition
            var histogram = {};
            for (var i = 0; i < data.length; i++) {
              var obj = data[i];
              if (histogram.hasOwnProperty(obj.nombre_modelo)) {
                histogram[obj.nombre_modelo].count++;
              } else {
                histogram[obj.nombre_modelo] = {
                  nombre_modelo: obj.nombre_modelo,
                  nombre_marca: obj.nombre_marca,
                  count: 1
                };
              }
            }
            return histogram;
          }).then(function(histogram) {
            var items = [];
            for (var prop in histogram) {
              items.push(histogram[prop]);
            }
            return items.sort(function(a, b) {
              return b.count - a.count;
            });
          });
        }
      },
      views: {
        'content@app': {
          templateUrl: 'app/main/reportes/modelosMasBuscados/modelosMasBuscados.html',
          controller: 'ModelosMasBuscadosController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('reportes.modelosMasBuscados', {
        title : 'Modelos Mas Solicitados',
        state : 'app.modelosMasBuscados',
        weight: 1
    });
  }

})();
