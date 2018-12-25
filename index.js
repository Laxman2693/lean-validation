'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeanValidator = function () {
    function LeanValidator(validations) {
        _classCallCheck(this, LeanValidator);

        this.validations = validations;
    }

    _createClass(LeanValidator, [{
        key: 'validate',
        value: function validate(state) {
            var validation = this.valid();

            this.validations.forEach(function (rule) {

                if (!validation[rule.field].isInvalid) {
                    var field_value = state[rule.field].toString();
                    var args = rule.args || [];
                    var validation_method = typeof rule.method === 'string' ? _validator2.default[rule.method] : rule.method;

                    if (validation_method.apply(undefined, [field_value].concat(_toConsumableArray(args), [state])) !== rule.validWhen) {
                        validation[rule.field] = { isInvalid: true, message: rule.message };
                        validation.isValid = false;
                    }
                }
            });

            return validation;
        }
    }, {
        key: 'valid',
        value: function valid() {
            var validation = {};

            this.validations.map(function (rule) {
                return validation[rule.field] = { isInvalid: false, message: '' };
            });

            return _extends({ isValid: true }, validation);
        }
    }]);

    return LeanValidator;
}();

exports.default = LeanValidator;