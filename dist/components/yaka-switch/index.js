'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YakaSwitch = undefined;

var _switch = require('igroot/lib/switch');

var _switch2 = _interopRequireDefault(_switch);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/switch/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaSwitch = exports.YakaSwitch = function (_Component) {
  _inherits(YakaSwitch, _Component);

  function YakaSwitch(props) {
    _classCallCheck(this, YakaSwitch);

    var _this = _possibleConstructorReturn(this, (YakaSwitch.__proto__ || Object.getPrototypeOf(YakaSwitch)).call(this, props));

    _initialiseProps.call(_this);

    var value = _this.props.value;

    var newValue = value;

    if (typeof value === 'string') {
      if (value.toLowerCase() === 'false') newValue = false;
      if (value.toLowerCase() === 'true') newValue = true;
    }

    _this.state = {
      status: !!newValue
    };
    return _this;
  }

  _createClass(YakaSwitch, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          status: !!nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.status;

      var note = {
        checkedChildren: '是',
        unCheckedChildren: '否'
      };

      return _react2.default.createElement(_switch2.default, _extends({}, note, this.props, { checked: status, onChange: this.handleChange }));
    }
  }]);

  return YakaSwitch;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (value) {
    var onChange = _this2.props.onChange;


    _this2.setState({
      status: value
    });

    onChange && onChange(value);
  };
};