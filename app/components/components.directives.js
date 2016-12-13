'use strict';

angular.module('app').

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
]).

/**
 * @ngdoc directive
 * @name components.directive:form
 * @description 
 * Validate form.
 * @restrict E
 */
directive('form', [function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                element.find('.mdl-textfield').removeClass('is-invalid');
                var formScope = scope[element.attr('name')];
                element.on('submit', function () {
                    if (formScope.$valid) {
                        return;
                    }
                    element.find(':input').each(function (key, value) {
                        if (formScope[$(value).attr('name')] && !formScope[$(value).attr('name')].$valid) {
                            $(value).closest('.mdl-textfield').addClass('is-invalid');
                            return false;
                        }
                    })
                });
            }
        };
    }
]);
