'use strict';

angular.module('app').

/**
 * @ngdoc controller
 * @name contact.controller:homeCtrl
 * @description 
 * The contact controller.
 * @requires $scope
 */
controller('bilanCtrl', ['$scope', '$http',
    
    function ($scope, $http) {

        if (typeof componentHandler !== 'undefined') {
            componentHandler.upgradeDom();
        }

        $scope.formData = {
            bilan: true
        };

        $scope.submit = function () {
            if (!$scope.bilanForm.$valid) {
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
