import React, { Component } from 'react'
import { Table, Form, Upload, message, Button, Icon, Modal, Spin } from 'igroot'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import XLSX from 'xlsx'
import uuidv4 from 'uuid/v4'
import './index.css'
const FormItem = Form.Item
const SortableItem = SortableElement(({ value }) =>
    <li className="excel-item excel-drag-item">{value}</li>
)

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    )
})

export class YakaEditTable extends Component {
    state = {
        columns: [],
        name: '',
        visible: false,
        items: [],
        dataSource: [],
        uploadLoading: false
    }

    optionsTitle = []

    optionsKey = []

    excelData = null

    excelColName = 0

    componentWillMount = () => {
        const props = this.props
        this.createColumns(props)
        this.createDataSource(props)
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.columns.length !== this.props.columns.length) {
            this.createColumns(nextProps)
        }
    }

    createDataSource = (props) => {
        const { columns, value } = props
        this._value = this.createDafaultValue(columns)
        if (value !== null) {
            const values = value
                .filter(val => val !== null)
                .map(val => {
                    val.key = uuidv4()
                    return val
                })
            this.setState({
                dataSource: values
            })
        } else {
            const val = []
            val.push(Object.assign({ key: uuidv4() }, this._value))
            this.setState({
                dataSource: val
            })
        }
    }

    createColumns = (props) => {
        const { columns, ele, form, elementWalk, yakaApis, componentCheck, remove } = props
        const { getFieldDecorator } = form

        columns.map(col => {
            if (col.component && componentCheck(col)) {
                col.render = (text, row, index) => <FormItem style={{ marginBottom: 0 }}>
                    {
                        getFieldDecorator(`${ele.name}[${index}].${col.name}`, {
                            initialValue: text ? text : null,
                            rules: col.rules ? col.rules : null
                        })(
                            elementWalk([col], yakaApis)[0]
                        )
                    }
                </FormItem>

                this.optionsTitle.push(col.title)
                this.optionsKey.push(col.name)
            } else {
                col.render = () => <div>非法表单组件</div>
            }

            col.dataIndex = col.name
            col.width = col.width ? col.width : null
            return col
        })

        if (remove !== false) {
            columns.push({
                title: '操作',
                name: 'handle',
                width: 60,
                fixed: 'right',
                render: (text, row, index) => <div style={{ textAlign: 'center' }}>
                    <a onClick={() => this.handleDetlete(index)}>删除</a>
                </div>
            })
        }
        this.setState({
            columns,
            name: ele.name
        })
    }


    createDafaultValue = (columns) => {
        const val = {}
        columns.forEach(col => {
            val[col.name] = undefined
        })
        return val
    }

    handleAdd = () => {
        const { dataSource } = this.state
        dataSource.push(Object.assign({ key: uuidv4() }, this._value))

        this.setState({
            dataSource
        })
    }

    handleDetlete = (index) => {
        const { dataSource, name } = this.state
        if (dataSource.length === 1) {
            message.error('数据不能少于一列')
        } else {
            const val = this.props.form.getFieldValue(name)
            dataSource.pop()
            val.splice(index, 1)
            this.setState({ dataSource: [...dataSource] }, () => {
                const obj = {}
                obj[name] = val
                this.props.form.setFieldsValue(obj)
            })
        }
    }

    renderOpt = () => {
        const { uploadExcel, exportExcel } = this.props

        return (
            <div className="igroot-editor-table-opt-area">
                {
                    (uploadExcel !== false) && <div className="igroot-upload-excel">
                        <Upload beforeUpload={this.beforeUpload}>
                            <Button>
                                <Icon type="upload" size="small" /> 导入excel
            </Button>
                        </Upload>
                    </div>
                }
                {
                    (exportExcel !== false) && <Button onClick={this.handleExportXlsx} type='primary' style={{ float: 'right' }}>导出excel</Button>
                }
            </div>

        )
    }

    beforeUpload = (file, fileList) => {
        const fileArray = file.name.split('.')
        const type = fileArray[fileArray.length - 1]

        if (type == 'xls' || type == 'xlsx') {
            this.getXLSData(file)
        } else {
            message.error('您上传的格式不是 xls 或者 xslx')
        }

        return false
    }

    getXLSData = (file) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            const bstr = e.target.result
            const wb = XLSX.read(bstr, { type: 'binary' })
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 })

            if (data.length) {
                this.splitXlsxData(data)
            }
        }

        reader.readAsBinaryString(file)
    }

    getXlsxColNum = (array) => {
        let num = -1
        let flag = false

        array.map((item, index) => {
            if (flag) return

            if (item.length !== num) {
                num = item.length
            } else {
                flag = true
            }
        })

        return num
    }

    splitXlsxData = (data) => {
        const colNum = this.getXlsxColNum(data)
        const excelList = data
        const colName = excelList[0].map(item => item.replace(/(^\s*)|(\s*$)/g, ''))
        const excelData = []

        if (colNum < 0) {
            message.error('表格的格式不符合要求')
            return
        }

        excelList.map((arr, index) => {
            if (index > 0 && arr.length) {
                const item = {}
                arr.map((v, i) => {
                    item[colName[i]] = v
                })

                excelData.push(item)
            }
        })

        this.excelData = excelData
        this.excelColName = colName

        const dragItems = []

        this.optionsTitle.map(title => {
            if (colName.includes(title)) {
                dragItems.push(title)
            } else {
                dragItems.push('#无匹配#')
            }
        })

        colName.map(name => {
            if (!dragItems.includes(name)) dragItems.push(name)
        })

        this.setState({
            visible: true,
            items: dragItems
        })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { items } = this.state

        this.setState({
            items: arrayMove(items, oldIndex, newIndex)
        })
    }

    handleOk = (e) => {
        const { name } = this.props
        const { items, dataSource } = this.state
        const { excelData } = this
        const addData = []

        this.setState({
            uploadLoading: true
        })

        const timer = setTimeout(() => {
            excelData.map((v, i) => {
                const item = {}

                this.optionsKey.map((key, index) => {
                    item[key] = v[items[index]] || ''
                })
                addData.push(item)
            })

            const isOne = dataSource.length === 1

            this.setState({
                dataSource: dataSource.concat(addData),
                visible: false,
                uploadLoading: false
            }, () => {
                isOne && this.handleDetlete(0)
            })

            clearTimeout(timer)
        }, 100)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    renderMapExcelItem = () => {
        const { uploadLoading } = this.state

        return (
            <div className="excel-map-container">
                <p>Excel 数据已准备好, 请确定 Excel 字段 和待写入的字段一致</p>
                <p>移动 Excel 字段，使得和待写入的字段对应</p>
                <div className="excel-map-left">
                    <h2>Excel 的字段</h2>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                </div>
                <div className="excel-map-right">
                    <h2>待导入的字段</h2>
                    <ul>
                        {
                            this.optionsTitle.map((title, i) => (
                                <li className="excel-item" key={i}>{title}</li>
                            ))
                        }
                    </ul>
                </div>
                {
                    uploadLoading &&
                    <div className="excel-upload-loading">
                        <Spin />
                        <div className="loading-txt">数据疯狂导入中...</div>
                    </div>
                }
            </div>
        )
    }

    handleExportXlsx = () => {
        //获取数据源
        const { name, columns } = this.state
        const dataSource = this.props.form.getFieldValue(name)
        //创建空的workerbook
        const workbook = XLSX.read(new Uint8Array(), { type: "array" });
        //新加sheet
        let wsData = []
        //写入表头
        let header = []
        for (var value of columns) {
            let title = value['title']
            header.push(title)
        }
        wsData.push(header)
        //写入主体数据
        for (var value of dataSource) {
            let line = []
            for (var column of columns) {
                let key = column['dataIndex']
                let cell = value[key] ? value[key] : ' '
                line.push(cell)
            }
            wsData.push(line)
        }

        const worksheet = XLSX.utils.aoa_to_sheet(wsData)
        workbook.Sheets['Sheet1'] = worksheet
        //输出excel
        const wopts = { bookType: 'xls', bookSST: false, type: 'binary' }
        const wbout = XLSX.write(workbook, wopts)
        //预处理函数
        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF
            }
            return buf;
        }
        this.downFile(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), name + '_' + new Date().toLocaleString() + '.' + 'xls')
    }

    downFile = (blob, fileName) => {
        let doc = document.createElement('a')
        doc.href = window.URL.createObjectURL(blob)
        doc.download = fileName
        doc.click();

    }

    render() {
        const { visible } = this.state
        const AddButton = () =>
            <Button type='dashed' style={{ width: '100%' }} onClick={this.handleAdd}>
                新增行
      </Button>
        const { dataSource, columns } = this.state
        const { scrollWidth, add } = this.props
        return (
            <div className="yaka-edit-table">
                {this.renderOpt()}
                <Table
                    columns={columns}
                    footer={add === false ? null : AddButton}
                    dataSource={dataSource}
                    pagination={false}
                    rowKey='key'
                    scroll={scrollWidth ? { x: scrollWidth } : { x: null, y: null }}
                />
                <Modal
                    title="匹配 Excel 字段"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.renderMapExcelItem()}
                </Modal>
            </div>
        )
    }
}
