(function() {
  'use strict';

  angular
    .module('app.reportes.marcasMasBuscadas', [
      'datatables', 'flow', 'angularMoment', 'ngMaterial', 'lfNgMdFileInput'
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
    // State
    $stateProvider.state('app.marcasMasBuscadas', {
      url: '/reportes/marcasMasBuscadas',
      resolve: {
        marcas: function(api) {
          return api.reportes.autosElegidosPorLeads().then(function(res) {
            return res.data;
          }).then(function(data) {
            // Histogram to save brands apparition
            var histogram = {};
            for (var i = 0; i < data.length; i++) {
              var obj = data[i];
              if (histogram.hasOwnProperty(obj.nombre_marca)) {
                histogram[obj.nombre_marca].count++;
              } else {
                histogram[obj.nombre_marca] = {
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
          templateUrl: 'app/main/reportes/marcasMasBuscadas/marcasMasBuscadas.html',
          controller: 'MarcasMasBuscadasController as vm'
        }
      }
    });

    msNavigationServiceProvider.saveItem('reportes.marcasMasBuscadas', {
        title : 'Marcas Mas Solicitadas',
        state : 'app.marcasMasBuscadas',
        weight: 1
    });
  }

})();
