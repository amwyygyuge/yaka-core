'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaEditTable = undefined;

var _modal = require('igroot/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _table = require('igroot/lib/table');

var _table2 = _interopRequireDefault(_table);

var _spin = require('igroot/lib/spin');

var _spin2 = _interopRequireDefault(_spin);

var _upload = require('igroot/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _button = require('igroot/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('igroot/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message2 = require('igroot/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _form = require('igroot/lib/form');

var _form2 = _interopRequireDefault(_form);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/modal/style');

require('igroot/lib/table/style');

require('igroot/lib/spin/style');

require('igroot/lib/upload/style');

require('igroot/lib/button/style');

require('igroot/lib/icon/style');

require('igroot/lib/message/style');

require('igroot/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSortableHoc = require('react-sortable-hoc');

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;
var SortableItem = (0, _reactSortableHoc.SortableElement)(function (_ref) {
    var value = _ref.value;
    return _react2.default.createElement(
        'li',
        { className: 'excel-item excel-drag-item' },
        value
    );
});

var SortableList = (0, _reactSortableHoc.SortableContainer)(function (_ref2) {
    var items = _ref2.items;

    return _react2.default.createElement(
        'ul',
        null,
        items.map(function (value, index) {
            return _react2.default.createElement(SortableItem, { key: 'item-' + index, index: index, value: value });
        })
    );
});

var YakaEditTable = exports.YakaEditTable = function (_Component) {
    _inherits(YakaEditTable, _Component);

    function YakaEditTable() {
        var _ref3;

        var _temp, _this, _ret;

        _classCallCheck(this, YakaEditTable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = YakaEditTable.__proto__ || Object.getPrototypeOf(YakaEditTable)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
            columns: [],
            name: '',
            visible: false,
            items: [],
            dataSource: [],
            uploadLoading: false
        }, _this.optionsTitle = [], _this.optionsKey = [], _this.excelData = null, _this.excelColName = 0, _this.componentWillMount = function () {
            var props = _this.props;
            _this.createColumns(props);
            _this.createDataSource(props);
        }, _this.componentWillReceiveProps = function (nextProps) {
            if (nextProps.columns.length !== _this.props.columns.length) {
                _this.createColumns(nextProps);
            }
        }, _this.createDataSource = function (props) {
            var columns = props.columns,
                value = props.value;

            _this._value = _this.createDafaultValue(columns);
            if (value !== null) {
                var values = value.filter(function (val) {
                    return val !== null;
                }).map(function (val) {
                    val.key = (0, _v2.default)();
                    return val;
                });
                _this.setState({
                    dataSource: values
                });
            } else {
                var val = [];
                val.push(Object.assign({ key: (0, _v2.default)() }, _this._value));
                _this.setState({
                    dataSource: val
                });
            }
        }, _this.createColumns = function (props) {
            var columns = props.columns,
                ele = props.ele,
                form = props.form,
                elementWalk = props.elementWalk,
                yakaApis = props.yakaApis,
                componentCheck = props.componentCheck,
                remove = props.remove;
            var getFieldDecorator = form.getFieldDecorator;


            columns.map(function (col) {
                if (col.component && componentCheck(col)) {
                    col.render = function (text, row, index) {
                        return _react2.default.createElement(
                            FormItem,
                            { style: { marginBottom: 0 } },
                            getFieldDecorator(ele.name + '[' + index + '].' + col.name, {
                                initialValue: text ? text : null,
                                rules: col.rules ? col.rules : null
                            })(elementWalk([col], yakaApis)[0])
                        );
                    };

                    _this.optionsTitle.push(col.title);
                    _this.optionsKey.push(col.name);
                } else {
                    col.render = function () {
                        return _react2.default.createElement(
                            'div',
                            null,
                            '\u975E\u6CD5\u8868\u5355\u7EC4\u4EF6'
                        );
                    };
                }

                col.dataIndex = col.name;
                col.width = col.width ? col.width : null;
                return col;
            });

            if (remove !== false) {
                columns.push({
                    title: '操作',
                    name: 'handle',
                    width: 60,
                    fixed: 'right',
                    render: function render(text, row, index) {
                        return _react2.default.createElement(
                            'div',
                            { style: { textAlign: 'center' } },
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick() {
                                        return _this.handleDetlete(index);
                                    } },
                                '\u5220\u9664'
                            )
                        );
                    }
                });
            }
            _this.setState({
                columns: columns,
                name: ele.name
            });
        }, _this.createDafaultValue = function (columns) {
            var val = {};
            columns.forEach(function (col) {
                val[col.name] = undefined;
            });
            return val;
        }, _this.handleAdd = function () {
            var dataSource = _this.state.dataSource;

            dataSource.push(Object.assign({ key: (0, _v2.default)() }, _this._value));

            _this.setState({
                dataSource: dataSource
            });
        }, _this.handleDetlete = function (index) {
            var _this$state = _this.state,
                dataSource = _this$state.dataSource,
                name = _this$state.name;

            if (dataSource.length === 1) {
                _message3.default.error('数据不能少于一列');
            } else {
                var val = _this.props.form.getFieldValue(name);
                dataSource.pop();
                val.splice(index, 1);
                _this.setState({ dataSource: [].concat(_toConsumableArray(dataSource)) }, function () {
                    var obj = {};
                    obj[name] = val;
                    _this.props.form.setFieldsValue(obj);
                });
            }
        }, _this.renderOpt = function () {
            var _this$props = _this.props,
                uploadExcel = _this$props.uploadExcel,
                exportExcel = _this$props.exportExcel;


            return _react2.default.createElement(
                'div',
                { className: 'igroot-editor-table-opt-area' },
                uploadExcel !== false && _react2.default.createElement(
                    'div',
                    { className: 'igroot-upload-excel' },
                    _react2.default.createElement(
                        _upload2.default,
                        { beforeUpload: _this.beforeUpload },
                        _react2.default.createElement(
                            _button2.default,
                            null,
                            _react2.default.createElement(_icon2.default, { type: 'upload', size: 'small' }),
                            ' \u5BFC\u5165excel'
                        )
                    )
                ),
                exportExcel !== false && _react2.default.createElement(
                    _button2.default,
                    { onClick: _this.handleExportXlsx, type: 'primary', style: { float: 'right' } },
                    '\u5BFC\u51FAexcel'
                )
            );
        }, _this.beforeUpload = function (file, fileList) {
            var fileArray = file.name.split('.');
            var type = fileArray[fileArray.length - 1];

            if (type == 'xls' || type == 'xlsx') {
                _this.getXLSData(file);
            } else {
                _message3.default.error('您上传的格式不是 xls 或者 xslx');
            }

            return false;
        }, _this.getXLSData = function (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var bstr = e.target.result;
                var wb = _xlsx2.default.read(bstr, { type: 'binary' });
                var wsname = wb.SheetNames[0];
                var ws = wb.Sheets[wsname];
                var data = _xlsx2.default.utils.sheet_to_json(ws, { header: 1 });

                if (data.length) {
                    _this.splitXlsxData(data);
                }
            };

            reader.readAsBinaryString(file);
        }, _this.getXlsxColNum = function (array) {
            var num = -1;
            var flag = false;

            array.map(function (item, index) {
                if (flag) return;

                if (item.length !== num) {
                    num = item.length;
                } else {
                    flag = true;
                }
            });

            return num;
        }, _this.splitXlsxData = function (data) {
            var colNum = _this.getXlsxColNum(data);
            var excelList = data;
            var colName = excelList[0].map(function (item) {
                return item.replace(/(^\s*)|(\s*$)/g, '');
            });
            var excelData = [];

            if (colNum < 0) {
                _message3.default.error('表格的格式不符合要求');
                return;
            }

            excelList.map(function (arr, index) {
                if (index > 0 && arr.length) {
                    var item = {};
                    arr.map(function (v, i) {
                        item[colName[i]] = v;
                    });

                    excelData.push(item);
                }
            });

            _this.excelData = excelData;
            _this.excelColName = colName;

            var dragItems = [];

            _this.optionsTitle.map(function (title) {
                if (colName.includes(title)) {
                    dragItems.push(title);
                } else {
                    dragItems.push('#无匹配#');
                }
            });

            colName.map(function (name) {
                if (!dragItems.includes(name)) dragItems.push(name);
            });

            _this.setState({
                visible: true,
                items: dragItems
            });
        }, _this.onSortEnd = function (_ref4) {
            var oldIndex = _ref4.oldIndex,
                newIndex = _ref4.newIndex;
            var items = _this.state.items;


            _this.setState({
                items: (0, _reactSortableHoc.arrayMove)(items, oldIndex, newIndex)
            });
        }, _this.handleOk = function (e) {
            var name = _this.props.name;
            var _this$state2 = _this.state,
                items = _this$state2.items,
                dataSource = _this$state2.dataSource;
            var _this2 = _this,
                excelData = _this2.excelData;

            var addData = [];

            _this.setState({
                uploadLoading: true
            });

            var timer = setTimeout(function () {
                excelData.map(function (v, i) {
                    var item = {};

                    _this.optionsKey.map(function (key, index) {
                        item[key] = v[items[index]] || '';
                    });
                    addData.push(item);
                });

                var isOne = dataSource.length === 1;

                _this.setState({
                    dataSource: dataSource.concat(addData),
                    visible: false,
                    uploadLoading: false
                }, function () {
                    isOne && _this.handleDetlete(0);
                });

                clearTimeout(timer);
            }, 100);
        }, _this.handleCancel = function (e) {
            _this.setState({
                visible: false
            });
        }, _this.renderMapExcelItem = function () {
            var uploadLoading = _this.state.uploadLoading;


            return _react2.default.createElement(
                'div',
                { className: 'excel-map-container' },
                _react2.default.createElement(
                    'p',
                    null,
                    'Excel \u6570\u636E\u5DF2\u51C6\u5907\u597D, \u8BF7\u786E\u5B9A Excel \u5B57\u6BB5 \u548C\u5F85\u5199\u5165\u7684\u5B57\u6BB5\u4E00\u81F4'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    '\u79FB\u52A8 Excel \u5B57\u6BB5\uFF0C\u4F7F\u5F97\u548C\u5F85\u5199\u5165\u7684\u5B57\u6BB5\u5BF9\u5E94'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'excel-map-left' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Excel \u7684\u5B57\u6BB5'
                    ),
                    _react2.default.createElement(SortableList, { items: _this.state.items, onSortEnd: _this.onSortEnd })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'excel-map-right' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        '\u5F85\u5BFC\u5165\u7684\u5B57\u6BB5'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _this.optionsTitle.map(function (title, i) {
                            return _react2.default.createElement(
                                'li',
                                { className: 'excel-item', key: i },
                                title
                            );
                        })
                    )
                ),
                uploadLoading && _react2.default.createElement(
                    'div',
                    { className: 'excel-upload-loading' },
                    _react2.default.createElement(_spin2.default, null),
                    _react2.default.createElement(
                        'div',
                        { className: 'loading-txt' },
                        '\u6570\u636E\u75AF\u72C2\u5BFC\u5165\u4E2D...'
                    )
                )
            );
        }, _this.handleExportXlsx = function () {
            //获取数据源
            var _this$state3 = _this.state,
                name = _this$state3.name,
                columns = _this$state3.columns;

            var dataSource = _this.props.form.getFieldValue(name);
            //创建空的workerbook
            var workbook = _xlsx2.default.read(new Uint8Array(), { type: "array" });
            //新加sheet
            var wsData = [];
            //写入表头
            var header = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    var title = value['title'];
                    header.push(title);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            wsData.push(header);
            //写入主体数据
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = dataSource[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    var line = [];
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var column = _step3.value;

                            var key = column['dataIndex'];
                            var cell = value[key] ? value[key] : ' ';
                            line.push(cell);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    wsData.push(line);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var worksheet = _xlsx2.default.utils.aoa_to_sheet(wsData);
            workbook.Sheets['Sheet1'] = worksheet;
            //输出excel
            var wopts = { bookType: 'xls', bookSST: false, type: 'binary' };
            var wbout = _xlsx2.default.write(workbook, wopts);
            //预处理函数
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF;
                }
                return buf;
            }
            _this.downFile(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name + '_' + new Date().toLocaleString() + '.' + 'xls');
        }, _this.downFile = function (blob, fileName) {
            var doc = document.createElement('a');
            doc.href = window.URL.createObjectURL(blob);
            doc.download = fileName;
            doc.click();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(YakaEditTable, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var visible = this.state.visible;

            var AddButton = function AddButton() {
                return _react2.default.createElement(
                    _button2.default,
                    { type: 'dashed', style: { width: '100%' }, onClick: _this3.handleAdd },
                    '\u65B0\u589E\u884C'
                );
            };
            var _state = this.state,
                dataSource = _state.dataSource,
                columns = _state.columns;
            var _props = this.props,
                scrollWidth = _props.scrollWidth,
                add = _props.add;

            return _react2.default.createElement(
                'div',
                { className: 'yaka-edit-table' },
                this.renderOpt(),
                _react2.default.createElement(_table2.default, {
                    columns: columns,
                    footer: add === false ? null : AddButton,
                    dataSource: dataSource,
                    pagination: false,
                    rowKey: 'key',
                    scroll: scrollWidth ? { x: scrollWidth } : { x: null, y: null }
                }),
                _react2.default.createElement(
                    _modal2.default,
                    {
                        title: '\u5339\u914D Excel \u5B57\u6BB5',
                        visible: visible,
                        onOk: this.handleOk,
                        onCancel: this.handleCancel
                    },
                    this.renderMapExcelItem()
                )
            );
        }
    }]);

    return YakaEditTable;
}(_react.Component);