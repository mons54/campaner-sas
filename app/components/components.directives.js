'use strict';

angular.module('components').

/**
 * @ngdoc directive
 * @name components.directive:button
 * @description 
 * Disable blur after clicking a button.
 * @restrict E
 */
directive('button', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                element.blur();
            });
        }
    };
}).

/**
 * @ngdoc directive
 * @name components.directive:showModal
 * @description 
 * Add a click event to an item to show a modal.
 * @requires components.service:modal
 * @restrict A
 * @param {string} showModal Id of modal
 */
directive('showModal', ['modal',
    function (modal) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function (event) {
                    var element = modal.get(attrs.showModal);
                    modal.show(element);
                });
            }
        };
    }
]);
