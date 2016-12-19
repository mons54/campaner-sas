'use strict';

angular.module('app').

/**
 * @ngdoc controller
 * @name home.controller:homeCtrl
 * @description 
 * The home controller.
 * @requires $scope
 */
controller('homeCtrl', ['$scope',
    
    function ($scope) {

        if (typeof FB !== 'undefined') {
            try {
                FB.XFBML.parse();
            } catch (ex) {}
        }
    }
]);
