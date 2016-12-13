'use strict';

angular.module('app').

/**
 * @ngdoc controller
 * @name contact.controller:homeCtrl
 * @description 
 * The contact controller.
 * @requires $scope
 */
controller('contactCtrl', ['$scope', '$http',
    
    function ($scope, $http) {

        if (typeof componentHandler !== 'undefined') {
            componentHandler.upgradeDom();
        }

        angular.element('[data-required]').attr('required', true);

        $scope.formData = {
            contact: true
        };

        $scope.submit = function () {
            if (!$scope.contactForm.$valid) {
                return;
            }
            $scope.loading = true;
            $http.post('/php/email.php', $scope.formData)
            .then(function () {
                $scope.success = true;
            }, function () {
                $scope.error = true;
            })
            .finally(function () {
                delete $scope.loading;
            });
        };
    }
]);
