(function() {
  'use strict';

  angular.module('fuse').factory('api', apiService);

  /** @ngInject */
  function apiService($resource, $http, $httpParamSerializerJQLike) {

    var api = {};

    // Base Url
    api.baseDataUrl = 'app/data/';
    api.baseUrl = 'http://jrojas.dhdinc.info/autoguia-api/public/index.php';

    // config
    api.headerConfig = {
      json: {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      form: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      file: {
        headers: {
          'Content-Type': undefined
        }
      }
    };

    /*
      INICIO DE API DE USUARIOS
    */
    api.users = {
      get: function() {
        let req = {
            method: 'GET',
            url: 'http://digitalcook.info:8000/api/user?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
          };

        return $http(req);
      },
      create: function(user) {
        let data = {
          name: user.name,
          email: user.email,
          dolares: user.dolares,
          user_types_id: user.user_types_id,
          password: user.password
        }
        let req = {
            method: 'POST',
            url: 'http://digitalcook.info:8000/api/user/admin?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            data: data
          };

        return $http(req);
      },
      update: function(user) {
        let data = {
          name: user.name,
          email: user.email,
          dolares: user.dolares,
          user_types_id: user.user_types_id,
          password: user.password
        }

        return $http.put('http://digitalcook.info:8000/api/user/'+user.id+'?token='+localStorage.getItem('token'),data);
      },
      destroy: function(user) {
        let req = {
            method: 'DELETE',
            url: 'http://digitalcook.info:8000/api/user/'+user.id+'?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
          };

        return $http(req);
      },
    };

    /*
      FIN DE API DE USUARIOS
    */

    /*
      INICIO DE API DE ZONAS
    */

    api.zonas = {
      get: function() {
        let req = {
            method: 'GET',
            url: 'http://digitalcook.info:8000/api/zona?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
          };
        return $http(req);
      },
      create: function(zona) {
        let data = {
          name: zona.name,
          polygon: JSON.parse(zona.polygon)
        };
        let req = {
            method: 'POST',
            url: 'http://digitalcook.info:8000/api/zona?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            data: data
          };
        return $http(req);
      },
      /*update: function(auto) {
        return $http.put(api.baseUrl + '/autos/' + auto.id_auto, auto);
      },
      destroy: function(auto) {
        return $http.delete(api.baseUrl + '/autos/' + auto.id_auto);
      },
      updateImage: function(formData) {
        return $http.post(api.baseUrl + '/autos/image/auto', formData, api.headerConfig.file);
      }*/
    };

    /*
      FIN DE API DE ZONAS
    */

     /*
      INICIO DE API DE SUBZONAS
    */

    api.subzonas = {
      get: function() {
        let req = {
            method: 'GET',
            url: 'http://digitalcook.info:8000/api/sub_zone?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
          };
        return $http(req);
      },
      create: function(subzona) {
        let data = {
          zone: subzona.zona_id,
          name: subzona.name,
          polygon: JSON.parse(subzona.polygon)
        };
        let req = {
            method: 'POST',
            url: 'http://digitalcook.info:8000/api/sub_zone?token='+localStorage.getItem('token'),
            headers: {
              'Access-Control-Allow-Origin': '*'
            },
            data: data
          };
          console.log(JSON.stringify(data));
        return $http(req);
      },
      /*update: function(auto) {
        return $http.put(api.baseUrl + '/autos/' + auto.id_auto, auto);
      },
      destroy: function(auto) {
        return $http.delete(api.baseUrl + '/autos/' + auto.id_auto);
      },
      updateImage: function(formData) {
        return $http.post(api.baseUrl + '/autos/image/auto', formData, api.headerConfig.file);
      }*/
    };

    /*
      FIN DE API DE SUBZONAS
    */

    api.mockup = {
      getAutos: function() {
        return $http.get(api.baseDataUrl + 'mockups/autos.json');
      },
      getMarcas: function() {
        return $http.get(api.baseDataUrl + 'mockups/marcas.json');
      },
      getTipos: function() {
        return $http.get(api.baseDataUrl + 'mockups/tipos.json');
      }
    };

    api.autos = {
      get: function() {
        return $http.get(api.baseUrl + '/autos');
      },
      create: function(auto) {
        return $http.post(api.baseUrl + '/autos', auto);
      },
      update: function(auto) {
        return $http.put(api.baseUrl + '/autos/' + auto.id_auto, auto);
      },
      destroy: function(auto) {
        return $http.delete(api.baseUrl + '/autos/' + auto.id_auto);
      },
      updateImage: function(formData) {
        return $http.post(api.baseUrl + '/autos/image/auto', formData, api.headerConfig.file);
      }
    };

    api.marcas = {
      get: function() {
        return $http.get(api.baseUrl + '/marcas');
      },
      create: function(marca) {
        return $http.post(api.baseUrl + '/marcas', marca);
      },
      update: function(marca) {
        return $http.put(api.baseUrl + '/marcas/' + marca.id_marca, marca);
      },
      destroy: function(marca) {
        return $http.delete(api.baseUrl + '/marcas/' + marca.id_marca);
      },
      updateImage: function(formData) {
        return $http.post(api.baseUrl + '/marcas/image/marca', formData, api.headerConfig.file);
      }
    };

    api.tipos = {
      get: function() {
        return $http.get(api.baseUrl + '/tiposAuto');
      },
      create: function(tipo) {
        return $http.post(api.baseUrl + '/tiposAuto', tipo);
      },
      update: function(tipo) {
        return $http.put(api.baseUrl + '/tiposAuto/' + tipo.id_tipo, tipo);
      },
      destroy: function(tipo) {
        return $http.delete(api.baseUrl + '/tiposAuto/' + tipo.id_tipo);
      }
    };

    api.subtipos = {
      get: function() {
        return $http.get(api.baseUrl + '/subtiposAuto');
      },
      create: function(subtipo) {
        return $http.post(api.baseUrl + '/subtiposAuto', subtipo);
      },
      update: function(subtipo) {
        return $http.put(api.baseUrl + '/subtiposAuto/' + subtipo.id_subtipo, subtipo);
      },
      destroy: function(subtipo) {
        return $http.delete(api.baseUrl + '/subtiposAuto/' + subtipo.id_subtipo);
      }
    };

    api.versiones = {
      get: function() {
        return $http.get(api.baseUrl + '/versionesAuto');
      },
      create: function(version) {
        return $http.post(api.baseUrl + '/versionesAuto', version);
      },
      update: function(version) {
        return $http.put(api.baseUrl + '/versionesAuto/' + version.id_version, version);
      },
      destroy: function(version) {
        return $http.delete(api.baseUrl + '/versionesAuto/' + version.id_version);
      }
    };

    api.motores = {
      get: function() {
        return $http.get(api.baseUrl + '/motores');
      },
      create: function(motor) {
        return $http.post(api.baseUrl + '/motores', motor);
      },
      update: function(motor) {
        return $http.put(api.baseUrl + '/motores/' + motor.id_motor, motor);
      },
      destroy: function(motor) {
        return $http.delete(api.baseUrl + '/motores/' + motor.id_motor);
      }
    };

    api.combustibles = {
      get: function() {
        return $http.get(api.baseUrl + '/combustibles');
      },
      create: function(combustible) {
        return $http.post(api.baseUrl + '/combustibles', combustible);
      },
      update: function(combustible) {
        return $http.put(api.baseUrl + '/combustibles/' + combustible.id_combustible, combustible);
      },
      destroy: function(combustible) {
        return $http.delete(api.baseUrl + '/combustibles/' + combustible.id_combustible);
      }
    };

    api.dealers = {
      get: function() {
        return $http.get(api.baseUrl + '/dealers');
      },
      create: function(dealer) {
        return $http.post(api.baseUrl + '/dealers', dealer);
      },
      update: function(dealer) {
        return $http.put(api.baseUrl + '/dealers/' + dealer.id_dealer, dealer);
      },
      destroy: function(dealer) {
        return $http.delete(api.baseUrl + '/dealers/' + dealer.id_dealer);
      }
    };

    api.reportes = {
      asignacionesLeadParaDealers: function() {
        return $http.get(api.baseUrl + '/reportes/asignaciones_lead_para_dealers');
      },
      autosElegidosPorLeads: function() {
        return $http.get(api.baseUrl + '/reportes/autos_elegidos_por_leads');
      }
    };

    return api;
  }

})();
