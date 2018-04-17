'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YakaTable = undefined;

var _table = require('igroot/lib/table');

var _table2 = _interopRequireDefault(_table);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('igroot/lib/table/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YakaTable = exports.YakaTable = function (_Component) {
    _inherits(YakaTable, _Component);

    function YakaTable() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, YakaTable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YakaTable.__proto__ || Object.getPrototypeOf(YakaTable)).call.apply(_ref, [this].concat(args))), _this), _this.columns = [], _this.dataSource = [], _this.mergeConfig = {}, _this.mergeCount = {}, _this.MergeTable = function () {
            _this.super();
        }, _this.getColumns = function () {
            return _this.props.columns || [];
        }, _this.sortConfig = function (a, b) {
            return a.sort - b.sort;
        }, _this.getMergeConfig = function () {
            var columns = _this.getColumns();
            var mergeConfig = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var column = _step.value;

                    if (column.merge && column.sort) {
                        mergeConfig.push(column);
                    }
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

            mergeConfig = mergeConfig.sort(_this.sortConfig);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _column = _step2.value;

                    if (_column.merge && !_column.sort) {
                        mergeConfig.push(_column);
                    }
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

            var returnConfig = {};
            var i = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = mergeConfig[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _column2 = _step3.value;

                    returnConfig[i] = _column2.dataIndex;
                    i++;
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

            return returnConfig;
        }, _this.getDataSource = function () {
            return _this.props.dataSource || [];
        }, _this.setMergeArray = function (data, mergeIndex) {
            if (!_this.mergeConfig[mergeIndex]) {
                return data;
            }

            //获取合并dataIndex
            var dataIndex = _this.mergeConfig[mergeIndex];
            var mergeData = {};
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = data[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var row = _step4.value;

                    var _index = row[dataIndex] || 'other_'; //没有的统一用其他
                    if (!mergeData[_index]) {
                        mergeData[_index] = [];
                    }
                    mergeData[_index].push(row);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            var returnData = {};
            for (var index in mergeData) {
                var rows = mergeData[index];
                returnData[index] = _this.setMergeArray(rows, mergeIndex + 1);
            }

            return returnData;
        }, _this.caculateMergeColumns = function (datas, mergeIndex, row) {
            //如果递归到最后一层
            if (!_this.mergeConfig[mergeIndex]) {
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = datas[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var data = _step5.value;

                        _this.dataSource.push(data);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                return datas.length;
            }
            var dataIndex = _this.mergeConfig[mergeIndex];
            if (!_this.mergeCount[dataIndex]) {
                _this.mergeCount[dataIndex] = [];
            }
            //本组总行数
            var rowCount = 0;
            for (var index in datas) {
                var start = row; //定位当前所在行
                var _data = datas[index];
                var count = _this.caculateMergeColumns(_data, mergeIndex + 1, row);
                if (count == 0) {
                    continue;
                }
                row += count;
                var end = row - 1;
                rowCount += count;
                _this.mergeCount[dataIndex].push({
                    start: start,
                    end: end
                });
            }

            return rowCount;
        }, _this.setMergeColunmns = function () {
            var columns = _this.getColumns();
            //设置关联合并列
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = columns[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var column = _step6.value;

                    if (column.merge && column.affects) {
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = column.affects[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var affect = _step8.value;

                                _this.mergeCount[affect] = _this.mergeCount[column.dataIndex];
                            }
                        } catch (err) {
                            _didIteratorError8 = true;
                            _iteratorError8 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }
                            } finally {
                                if (_didIteratorError8) {
                                    throw _iteratorError8;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            var merge = _this.mergeCount;
            //加入合并函数
            var columnsData = [];
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                var _loop = function _loop() {
                    value = _step7.value;

                    var dataIndex = value['dataIndex'];
                    if (!merge[dataIndex]) {
                        columnsData.push(value);
                        return 'continue';
                    }
                    var mergeConfig = merge[dataIndex];
                    //设置列头合并规则函数
                    value['render'] = function (valueF, rowF, indexF) {
                        var obj = {
                            children: valueF,
                            props: {}
                        };
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = mergeConfig[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var config = _step9.value;

                                var start = config['start'];
                                var end = config['end'];
                                if (indexF == start) {
                                    obj.props.rowSpan = end - start + 1;
                                    return obj;
                                }
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }

                        obj.props.rowSpan = 0;
                        return obj;
                    };
                    columnsData.push(value);
                };

                for (var _iterator7 = columns[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var value;

                    var _ret2 = _loop();

                    if (_ret2 === 'continue') continue;
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            return columnsData;
        }, _this.mergeData = function () {
            var _this$props = _this.props,
                merge = _this$props.merge,
                columns = _this$props.columns,
                dataSource = _this$props.dataSource;

            if (merge) {
                _this.columns = [];
                _this.dataSource = [];
                _this.mergeConfig = {};
                _this.mergeCount = {};
                _this.mergeConfig = _this.getMergeConfig();
                var data = _this.getDataSource();
                var mergeArray = _this.setMergeArray(data, 0);
                //解数组计算合并行数
                _this.caculateMergeColumns(mergeArray, 0, 0);
                //甚至头部
                _this.columns = _this.setMergeColunmns();
            } else {
                _this.columns = columns;
                _this.dataSource = dataSource;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    //获取表头


    //对配置进行排序


    //获取合并配置


    //获取表体


    //合并数据聚合为多维数组


    //计算合并行数


    //设置头部


    //合并处理


    _createClass(YakaTable, [{
        key: 'render',
        value: function render() {
            this.mergeData();
            return _react2.default.createElement(_table2.default, _extends({}, this.props, {
                columns: this.columns,
                dataSource: this.dataSource
            }));
        }
    }]);

    return YakaTable;
}(_react.Component);