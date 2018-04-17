'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require('igroot/lib/card');

var _card2 = _interopRequireDefault(_card);

var _inputNumber = require('igroot/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _input = require('igroot/lib/input');

var _input2 = _interopRequireDefault(_input);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('igroot/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

require('igroot/lib/card/style');

require('igroot/lib/input-number/style');

require('igroot/lib/input/style');

require('igroot/lib/button/style');

require('igroot/lib/checkbox/style');

var _yakaEditTable = require('./yaka-edit-table');

var _yakaSwitch = require('./yaka-switch');

var _yakaEditor = require('./yaka-editor');

var _yakaSelect = require('./yaka-select/');

var _yakaDatepicker = require('./yaka-datepicker/');

var _yakaTimepicker = require('./yaka-timepicker/');

var _yakaTable = require('./yaka-table/');

var _yakaRadio = require('./yaka-radio/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = _checkbox2.default.Group;

exports.default = {
  EditTable: _yakaEditTable.YakaEditTable,
  Switch: _yakaSwitch.YakaSwitch,
  Editor: _yakaEditor.YakaEditor,
  TimePicker: _yakaTimepicker.YakaTimePicker,
  Checkbox: CheckboxGroup,
  Radio: _yakaRadio.Radio,
  Select: _yakaSelect.YakaSelect,
  Button: _button2.default,
  Input: _input2.default,
  InputNumber: _inputNumber2.default,
  Table: _yakaTable.YakaTable,
  Card: _card2.default,
  DatePicker: _yakaDatepicker.YakaDatePicker,
  TextArea: _input2.default.TextArea
};