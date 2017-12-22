'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YakaTimePicker = undefined;

var _timePicker = require('igroot/lib/time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/time-picker/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaTimePicker = exports.YakaTimePicker = function (_Component) {
  _inherits(YakaTimePicker, _Component);

  function YakaTimePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YakaTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaTimePicker.__proto__ || Object.getPrototypeOf(YakaTimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      time: '',
      value: null,
      formatTime: 'HH:mm:ss'
    }, _this.handleChange = function (time) {
      var onChange = _this.props.onChange;
      var formatTime = _this.state.formatTime;

      var value = (0, _moment2.default)(time).format(formatTime);

      _this.setState({
        time: time,
        value: value
      });

      onChange && onChange(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YakaTimePicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var formatTime = this.state.formatTime;
      var _props = this.props,
          defaultValue = _props.defaultValue,
          format = _props.format;


      this.setState({
        value: defaultValue,
        formatTime: format || formatTime,
        time: defaultValue || (0, _moment2.default)(defaultValue, format || formatTime)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          format = nextProps.format;
      var formatTime = this.state.formatTime;

      var time = value ? (0, _moment2.default)('' + value, format || formatTime) : null;

      if ('value' in nextProps) {
        this.setState({
          value: value,
          format: format || formatTime,
          time: time
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var time = this.state.time;


      return _react2.default.createElement(_timePicker2.default, _extends({}, this.props, { value: time, onChange: this.handleChange }));
    }
  }]);

  return YakaTimePicker;
}(_react.Component);