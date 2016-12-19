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
                $rootScope.navTitle = $route.current.navTitle;
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
                navTitle: "Accueil",
                title : "Campaner SAS - Isolation, ventilation, couverture, façade",
                description: "Campaner SAS est une entreprise spécialisée dans le conseil et l'accompagnement des projets d'isolation, de ventilation, de couverture et de façade à Toul et en Lorraine.",
                templateUrl: '/app/home/home.html',
                controller: 'homeCtrl'
            })
            .when('/isolation', {
                navTitle: "Isolation de combles perdus et aménagés",
                title : "Isolation de combles perdus et aménagés",
                description: "Campaner SAS entreprise spécialisée en isoltaion de combles perdus et aménagés.",
                templateUrl: '/app/isolation/isolation.html'
            })
            .when('/assainissement', {
                navTitle: "Assainissement et ventilation",
                title : "Assainissement et ventilation",
                description: "Campaner SAS entreprise spécialisée en assainissement et ventilation.",
                templateUrl: '/app/assainissement/assainissement.html'
            })
            .when('/demoussage', {
                navTitle: "Démoussage et hydrofugation de toiture",
                title : "Démoussage et entretien de converture",
                description: "Campaner SAS entreprise spécialisée en démoussage et entretien de converture.",
                templateUrl: '/app/demoussage/demoussage.html'
            })
            .when('/facades', {
                navTitle: "Façades",
                title : "Façades, peinture et crépis",
                description: "Campaner SAS entreprise spécialisée en façades, peinture et crépis.",
                templateUrl: '/app/facades/facades.html'
            })
            .when('/contact', {
                navTitle: "Contactez-nous",
                title : "Contactez-nous",
                description: "Contactez-nous afin de pouvoir vous conseiller au plus près de vos réels besoins.",
                templateUrl: '/app/contact/contact.html',
                controller: 'contactCtrl'
            })
            .when('/bilan', {
                navTitle: "Demande d'étude et de bilan gratuits",
                title : "Demande d'étude et de bilan gratuits",
                description: "Bénéficiez d'une étude et d'un bilan gratuit sur les performances énergétiques, l'état de votre converture et de l'air ambiant de votre maison.",
                templateUrl: '/app/bilan/bilan.html',
                controller: 'bilanCtrl'
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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-89130458-1', 'auto');
ga('send', 'pageview');
