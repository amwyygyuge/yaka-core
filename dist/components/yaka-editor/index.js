'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YakaEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wangeditor = require('wangeditor');

var _wangeditor2 = _interopRequireDefault(_wangeditor);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaEditor = exports.YakaEditor = function (_Component) {
  _inherits(YakaEditor, _Component);

  function YakaEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YakaEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaEditor.__proto__ || Object.getPrototypeOf(YakaEditor)).call.apply(_ref, [this].concat(args))), _this), _this.isFirstInit = true, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YakaEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          style = _props.style;

      var elem = document.getElementById(id);
      var editor = this.editor = new _wangeditor2.default(elem);
      this.setState({ id: id });
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.onchange = function (html) {
        (_this2.props.onChange || function () {})(html);
      };

      editor.customConfig.uploadImgShowBase64 = true;
      editor.create();
      if (style && style.height) {
        var height = style.height;
        editor.$textElem[0].parentElement.style.height = parseInt(height) - 48 + 'px';
      }
      editor.txt.html(this.props.value);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.isFirstInit && this.editor && this.editor.txt.html(nextProps.value);
        this.isFirstInit = false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          extraCls = _props2.extraCls,
          style = _props2.style,
          id = _props2.id,
          disabled = _props2.disabled;

      var cls = extraCls || '';

      return _react2.default.createElement(
        'div',
        { className: 'yaka-editor-container' },
        _react2.default.createElement('div', { id: id, className: 'yaka-editor ' + cls, style: style }),
        disabled && _react2.default.createElement('div', { className: 'disabled-mask' })
      );
    }
  }]);

  return YakaEditor;
}(_react.Component);