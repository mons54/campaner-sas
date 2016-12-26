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
                $rootScope.data = $route.current.data;

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
                templateUrl: '/app/home/home.html',
                controller: 'homeCtrl',
                data: {
                    title: "Accueil",
                    meta: {
                        title: "Campaner SAS - Isolation - Ventilation - Couverture - Façade",
                        description: "Campaner SAS est une entreprise spécialisée dans le conseil et l'accompagnement des projets d'isolation, de ventilation, de couverture et de façade à Toul et en Lorraine."
                    }
                }
            })
            .when('/isolation', {
                templateUrl: '/app/isolation/isolation.html',
                data: {
                    title: "Isolation de combles perdus et aménagés",
                    meta: {
                        title: "Campaner SAS - Isolation de combles perdus et aménagés",
                        description: "Campaner SAS entreprise spécialisée en isoltaion de combles perdus et aménagés."
                    }
                }
            })
            .when('/assainissement', {
                templateUrl: '/app/assainissement/assainissement.html',
                data: {
                    title: "Assainissement et ventilation",
                    meta: {
                        title: "Campaner SAS - Assainissement et ventilation",
                        description: "Campaner SAS entreprise spécialisée en assainissement et ventilation."
                    }
                }
            })
            .when('/demoussage', {
                templateUrl: '/app/demoussage/demoussage.html',
                data: {
                    title: "Démoussage et hydrofugation de toiture",
                    meta: {
                        title: "Campaner SAS - Démoussage et entretien de converture",
                        description: "Campaner SAS entreprise spécialisée en démoussage et entretien de converture."
                    }
                }
            })
            .when('/facades', {
                templateUrl: '/app/facades/facades.html',
                data: {
                    title: "Façades",
                    meta: {
                        title: "Campaner SAS - Façades, peinture et crépis",
                        description: "Campaner SAS entreprise spécialisée en façades, peinture et crépis."
                    }
                }
            })
            .when('/contact', {
                templateUrl: '/app/contact/contact.html',
                controller: 'contactCtrl',
                data: {
                    title: "Contact",
                    meta: {
                        title: "Campaner SAS - Contactez-nous",
                        description: "Contactez-nous afin de pouvoir vous conseiller au plus près de vos réels besoins."
                    }
                }
            })
            .when('/etude-bilan', {
                templateUrl: '/app/project/project.html',
                controller: 'projectCtrl',
                data: {
                    title: "Demande d'étude et de bilan gratuits",
                    meta: {
                        title: "Campaner SAS - Demande d'étude et de bilan gratuits",
                        description: "Bénéficiez d'une étude et d'un bilan gratuit sur les performances énergétiques, l'état de votre converture et de l'air ambiant de votre maison."
                    }
                }
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
