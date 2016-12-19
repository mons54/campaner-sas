'use strict';

angular.module('app').

/**
 * @ngdoc controller
 * @name contact.controller:projectCtrl
 * @description 
 * The contact controller.
 * @requires $scope
 */
controller('projectCtrl', ['$scope', '$http',
    
    function ($scope, $http) {

        if (typeof componentHandler !== 'undefined') {
            componentHandler.upgradeDom();
        }

        $scope.formData = {
            project: true
        };

        $scope.submit = function () {
            if (!$scope.projectForm.$valid) {
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
