(function () {
    
    'use strict';

    angular.

    /**
     * @ngdoc overview
     * @name app
     * @description
     * The module of app.
     * @requires ngRoute
     */
    module('app', [
        'ngRoute'
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

                closeDrawer();
            });

            function closeDrawer() {
                var drawer = angular.element('.mdl-layout__drawer');
                if (!drawer || !drawer.hasClass('is-visible')) {
                  return;
                }

                var layout = document.querySelector('.mdl-layout.is-small-screen').MaterialLayout;
                if (!layout) {
                  return;
                }
                layout.toggleDrawer();
            }
        }
    ]).

    config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                title : "Accueil",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/home/home.html',
                controller: 'homeCtrl'
            })
            .when('/isolation', {
                title : "Isolation",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/isolation/isolation.html'
            })
            .when('/assainissement', {
                title : "Assainissement",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/assainissement/assainissement.html'
            })
            .when('/demoussage', {
                title : "Démoussage",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/demoussage/demoussage.html'
            })
            .when('/facades', {
                title : "Facades",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/facades/facades.html'
            })
            .when('/contact', {
                title : "Contact",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/contact/contact.html',
                controller: 'contactCtrl'
            })
            .when('/bilan', {
                title : "bilan",
                description: "Conseils en amélioration et embellissement de l'habitat.",
                templateUrl: '/app/bilan/bilan.html'
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
