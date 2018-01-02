'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require('igroot/lib/input');

var _input2 = _interopRequireDefault(_input);

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

var _card = require('igroot/lib/card');

var _card2 = _interopRequireDefault(_card);

var _col = require('igroot/lib/col');

var _col2 = _interopRequireDefault(_col);

var _row = require('igroot/lib/row');

var _row2 = _interopRequireDefault(_row);

var _table = require('igroot/lib/table');

var _table2 = _interopRequireDefault(_table);

var _inputNumber = require('igroot/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _checkbox = require('igroot/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _EditTable$Switch$Edi;

require('igroot/lib/input/style');

require('igroot/lib/form/style');

require('igroot/lib/card/style');

require('igroot/lib/col/style');

require('igroot/lib/row/style');

require('igroot/lib/table/style');

require('igroot/lib/input-number/style');

require('igroot/lib/button/style');

require('igroot/lib/checkbox/style');

var _yakaEditTable = require('./yaka-edit-table');

var _yakaSwitch = require('./yaka-switch');

var _yakaEditor = require('./yaka-editor');

var _yakaSelect = require('./yaka-select/');

var _yakaDatepicker = require('./yaka-datepicker/');

var _yakaTimepicker = require('./yaka-timepicker/');

var _yakaTextarea = require('./yaka-textarea/');

var _yakaRadio = require('./yaka-radio/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxGroup = _checkbox2.default.Group;

exports.default = (_EditTable$Switch$Edi = {
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
  Table: _table2.default,
  Row: _row2.default,
  Col: _col2.default,
  Card: _card2.default,
  Form: _form2.default,
  DatePicker: _yakaDatepicker.YakaDatePicker
}, _defineProperty(_EditTable$Switch$Edi, 'Input', _input2.default), _defineProperty(_EditTable$Switch$Edi, 'TextArea', _yakaTextarea.YakaTextArea), _EditTable$Switch$Edi);