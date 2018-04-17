import React, { Component } from 'react'
import { Table } from 'igroot';
export class YakaTable extends Component {
    columns = []
    dataSource = []
    mergeConfig = {}
    mergeCount = {}

    MergeTable = () => {
        this.super()
    }

    //获取表头
    getColumns = () => {
        return this.props.columns || []
    }

    //对配置进行排序
    sortConfig = (a, b) => {
        return a.sort - b.sort
    }

    //获取合并配置
    getMergeConfig = () => {
        const columns = this.getColumns();
        let mergeConfig = [];
        for (let column of columns) {
            if (column.merge && column.sort) {
                mergeConfig.push(column)
            }
        }
        mergeConfig = mergeConfig.sort(this.sortConfig)
        for (let column of columns) {
            if (column.merge && !column.sort) {
                mergeConfig.push(column)
            }
        }

        let returnConfig = {}
        let i = 0
        for (let column of mergeConfig) {
            returnConfig[i] = column.dataIndex
            i++
        }

        return returnConfig
    }

    //获取表体
    getDataSource = () => {
        return this.props.dataSource || []
    }

    //合并数据聚合为多维数组
    setMergeArray = (data, mergeIndex) => {
        if (!this.mergeConfig[mergeIndex]) {
            return data
        }

        //获取合并dataIndex
        const dataIndex = this.mergeConfig[mergeIndex]
        let mergeData = {}
        for (let row of data) {
            const index = row[dataIndex] || 'other_'   //没有的统一用其他
            if (!mergeData[index]) {
                mergeData[index] = []
            }
            mergeData[index].push(row)
        }
        let returnData = {}
        for (let index in mergeData) {
            const rows = mergeData[index]
            returnData[index] = this.setMergeArray(rows, mergeIndex + 1)
        }

        return returnData
    }

    //计算合并行数
    caculateMergeColumns = (datas, mergeIndex, row) => {
        //如果递归到最后一层
        if (!this.mergeConfig[mergeIndex]) {
            for (let data of datas) {
                this.dataSource.push(data)
            }
            return datas.length
        }
        const dataIndex = this.mergeConfig[mergeIndex]
        if (!this.mergeCount[dataIndex]) {
            this.mergeCount[dataIndex] = []
        }
        //本组总行数
        let rowCount = 0
        for (let index in datas) {
            const start = row //定位当前所在行
            const data = datas[index]
            const count = this.caculateMergeColumns(data, mergeIndex + 1, row)
            if (count == 0) {
                continue
            }
            row += count;
            const end = row - 1
            rowCount += count
            this.mergeCount[dataIndex].push(
                {
                    start: start,
                    end: end,
                }
            )
        }

        return rowCount
    }

    //设置头部
    setMergeColunmns = () => {
        const columns = this.getColumns()
        //设置关联合并列
        for (let column of columns) {
            if (column.merge && column.affects) {
                for (let affect of column.affects) {
                    this.mergeCount[affect] = this.mergeCount[column.dataIndex]
                }
            }
        }
        const merge = this.mergeCount
        //加入合并函数
        let columnsData = []
        for (var value of columns) {
            let dataIndex = value['dataIndex']
            if (!merge[dataIndex]) {
                columnsData.push(value)
                continue
            }
            let mergeConfig = merge[dataIndex]
            //设置列头合并规则函数
            value['render'] = (valueF, rowF, indexF) => {
                const obj = {
                    children: valueF,
                    props: {},
                };
                for (var config of mergeConfig) {
                    let start = config['start']
                    let end = config['end']
                    if (indexF == start) {
                        obj.props.rowSpan = end - start + 1
                        return obj
                    }
                }
                obj.props.rowSpan = 0
                return obj
            }
            columnsData.push(value)
        }

        return columnsData
    }

    //合并处理
    mergeData = () => {
        const { merge, columns, dataSource } = this.props
        if (merge) {
            this.columns = []
            this.dataSource = []
            this.mergeConfig = {}
            this.mergeCount = {}
            this.mergeConfig = this.getMergeConfig()
            const data = this.getDataSource()
            const mergeArray = this.setMergeArray(data, 0)
            //解数组计算合并行数
            this.caculateMergeColumns(mergeArray, 0, 0)
            //甚至头部
            this.columns = this.setMergeColunmns()
        } else {
            this.columns = columns
            this.dataSource = dataSource
        }
    }
    render() {
        this.mergeData()
        return (
            <Table
                {...this.props}
                columns={this.columns}
                dataSource={this.dataSource}
            />
        )
    }
}
