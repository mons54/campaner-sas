(function () {
    
    'use strict';

    angular.

    /**
     * @ngdoc overview
     * @name app
     * @description
     * The module of app.
     * @requires ngRoute
     * @requires easypiechart
     * @requires pascalprecht.translate
     * @requires components
     * @requires game
     * @requires home
     * @requires ranking
     * @requires trophies
     */
    module('app', [
        'ngRoute',
        'components',
        'home'
    ]).

    run(['$rootScope', '$route',

        /**
         * @param {object} $rootScope Global scope
         * @param {object} $route Service route
         */
        function ($rootScope, $route) {

            $rootScope.$on('$routeChangeSuccess', function() {
                /**
                 * Set the meta tags
                 */
                $rootScope.title = $route.current.title;
                $rootScope.description = $route.current.description;
            });
        }
    ]).

    config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                title : "Accueil",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/home/templates/home.html',
                controller: 'homeCtrl'
            })
            .when('/isolation', {
                title : "Isolation",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/isolation/templates/isolation.html',
                controller: 'isolationCtrl'
            })
            .when('/assainissement', {
                title : "Assainissement",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/assainissement/templates/assainissement.html',
                controller: 'assainissementCtrl'
            })
            .when('/demoussage', {
                title : "Démoussage",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/demoussage/templates/demoussage.html',
                controller: 'demoussageCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode(true);
        }
    ]);

})();


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
