'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YakaDatePicker = undefined;

var _datePicker = require('igroot/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/date-picker/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaDatePicker = exports.YakaDatePicker = function (_Component) {
  _inherits(YakaDatePicker, _Component);

  function YakaDatePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YakaDatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaDatePicker.__proto__ || Object.getPrototypeOf(YakaDatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      date: '',
      value: null,
      formatDate: 'YYYY-MM-DD HH:mm:ss'
    }, _this.handleChange = function (date, value) {
      var onChange = _this.props.onChange;


      _this.setState({
        date: date,
        value: value
      });

      onChange && onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YakaDatePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var formatDate = this.state.formatDate;
      var _props = this.props,
          defaultValue = _props.defaultValue,
          format = _props.format;


      this.setState({
        value: defaultValue,
        formatDate: format || formatDate,
        date: defaultValue || (0, _moment2.default)(defaultValue, format || formatDate)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          format = nextProps.format;
      var formatDate = this.state.formatDate;

      var date = value ? (0, _moment2.default)('' + value, format || formatDate) : null;

      if ('value' in nextProps) {
        this.setState({
          value: value,
          format: format || formatDate,
          date: date
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var date = this.state.date;


      return _react2.default.createElement(_datePicker2.default, _extends({}, this.props, { value: date, onChange: this.handleChange }));
    }
  }]);

  return YakaDatePicker;
}(_react.Component);