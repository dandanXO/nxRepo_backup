import React, { useState, useEffect } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overdueStatistics2Action } from './index';
import { CommonTable } from 'components';
import { Tabs, Row, Col } from 'antd';
import styles from './OverdueStatistics2.less';
import moment from 'moment';
import SearchList from './SearchList/SearchList';
const { TabPane } = Tabs;
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from 'bizcharts';
import {getIsSuperAdmin, getAllMerchants} from "utils";
function OverdueStatistics2 ({ intl, getTableData, tableData: { data, pagination }, loading, getTimingDistribution, timingDistribution }) {

    const isSuperAdmin = getIsSuperAdmin();
    const allMerchants = getAllMerchants();
    const initTime=[moment(0, "HH").add(-7,'d'), moment({ hour: 23, minute: 59, seconds: 59 })]

    const [searchParams, setSearchParams] = useState({
        merchantId:'',
        startTime: initTime[0].format("YYYY-MM-DD 00:00:00"),
        endTime: initTime[1].format("YYYY-MM-DD 23:59:59"),
        page: 0,
        size: 10,
    });

    const [searchTimingParams, setSearchTimingParams] = useState({ startTime: "", endTime: "" })
  
    useEffect(() => {
        getTableData(searchParams);
    }, [searchParams]);

    useEffect(() => {
        getTimingDistribution(searchTimingParams)
    }, [searchTimingParams])

   
    const columns = [
        {
            title: intl.formatMessage({ id: "page.table.loan.date" }),
            dataIndex: 'loanDay',
            key: 'loanDay',
        },
        {
            title: intl.formatMessage({ id: "page.table.num.loan" }),
            dataIndex: 'loanCount',
            key: 'loanCount',
        },
        {
            title: intl.formatMessage({ id: "page.table.new.customer" }),
            dataIndex: 'newGuestCount',
            key: 'newGuestCount',
        },
        {
            title: intl.formatMessage({ id: "page.table.old.customer" }),
            dataIndex: 'oldGuestCount',
            key: 'oldGuestCount',
        },
        {
            title: intl.formatMessage({ id: "page.table.overdue.rate" }),
            dataIndex: 'overdueRate',
            key: 'overdueRate',
        },
        {
            title: intl.formatMessage({id: "page.table.overdue.rate.new.customer"}),
            dataIndex: 'newGuestOverdueRate',
            key: 'newGuestOverdueRate',
        },
        {
            title: intl.formatMessage({id: "page.table.overdue.rate.old.customer"}),
            dataIndex: 'oldGuestOverdueRate',
            key: 'oldGuestOverdueRate',
        }
    ]

    const handleSearch = (type, obj) => {
        const { time, merchantId='' } = obj
        const isArr = Array.isArray(time) && time.length > 0;
        const startTime = isArr ? time[0].format("YYYY-MM-DD 00:00:00") : "";
        const endTime = isArr ? time[1].format("YYYY-MM-DD 23:59:59") : "";
        type === "overdueTime" ? setSearchParams({ merchantId,startTime, endTime, page: 0, size: 10 }) : setSearchTimingParams({startTime, endTime})
    }
    const handlePageChange = (info) => {
        const { current, pageSize } = info;
        setSearchParams({ ...searchParams, page: current - 1, size: pageSize });
    }

    const dataForChart = timingDistribution.map((i, index) => {
        const aboveText = index === timingDistribution.length - 1 ? "+" : ""
        return { ...i, time: `${i.time} ${intl.formatMessage({ id: "page.table.times" })} ${aboveText}` }
    })
    //柱狀圖
    const colsBarGraph = {
        percentage: {
            alias: intl.formatMessage({ id: "page.table.percentage" }),
            tickInterval: 20,
        },
        time: {
            alias: intl.formatMessage({ id: "page.table.number.loan" }),
            tickInterval: 2,tickInterval: 2,
        }
    };
    const title = {
        textStyle: {
            fontSize: '12',
            textAlign: 'center',
            fill: '#151115',
        }
    }

    return (
      <div>
            <Tabs animated={false}>
                <TabPane tab={intl.formatMessage({ id: "page.table.overdue.time" })} key="overdueTime">
                    <SearchList initTime={initTime} handleSearch={handleSearch} type="overdueTime" isSuperAdmin={isSuperAdmin} allMerchants={allMerchants}/>
                    <CommonTable
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                        handlePageChange={handlePageChange}
                    />
                </TabPane>
                <TabPane tab={intl.formatMessage({ id: "page.table.overdue.timeing.distribution" })} key="timingDistribution">
                    <SearchList initTime={[]} handleSearch={handleSearch} type="timingDistribution"/>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Chart height={400} data={dataForChart} scale={colsBarGraph} forceFit>
                                <Axis name="time" title={title} />
                                <Axis name="percentage" title={title} />
                                <Axis name="overdueUserCountn" title={title} />
                                <Tooltip
                                    showTitle={false}
                                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{userCount} , {overdueUserCount}</li>'
                                />
                                <Geom type="interval" position="time*percentage"
                                    tooltip={['userCount*overdueUserCount', (userCount, overdueUserCount) => {
                                        return {
                                            userCount: `${intl.formatMessage({ id: "page.table.number.people" })}: ${userCount}`,
                                            overdueUserCount: `${intl.formatMessage({ id: "page.table.number.overdue.people" })}: ${overdueUserCount}`,
                                        };
                                    },
                                    ]} />
                            </Chart>
                        </Col>
                        <Col span={12}>
                            <Chart
                                width={600}
                                height={400}
                                data={dataForChart}
                                padding="auto"
                                forceFit
                                //點擊右邊類別選項
                                onGetG2Instance={(chart) => {
                                    setTimeout(() => {
                                        // 设置默认选中
                                        const geom = chart.get('geoms')[0]; // 获取所有的图形
                                        const times = geom.get('data'); // 获取图形对应的数据
                                        geom.setSelected(times[1]);
                                    }, 2000);
                                }}
                            >
                                <Coord type="theta" radius={0.65} />
                                <Axis name="percentage" />
                                <Legend position="right" offsetY={-400 / 2 + 120} offsetX={-100} /> {/* 右邊選項 */}
                                <Tooltip
                                    showTitle={false}
                                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name} : {value}</li>'
                                />
                                <Geom
                                    type="intervalStack"
                                    position="overdueUserCount"
                                    color="time"
                                    tooltip={['time*overdueUserCount',(time, overdueUserCount) => {
                                            return {
                                                name: time,
                                                value: `${intl.formatMessage({ id: "page.table.number.overdue.people" })} ${overdueUserCount}`,
                                            };
                                        },
                                    ]}
                                    style={{
                                        lineWidth: 1,
                                        stroke: '#fff',
                                    }}
                                />
                            </Chart>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
      </div>
    );
}


const mapStateToProps = (state) => {
    const { businessStatisticsState: { overdueStatistics2State } } = state;
    return {
        tableData: overdueStatistics2State['tableData'],
        loading: overdueStatistics2State['loading'],
        timingDistribution: overdueStatistics2State['timingDistribution'],
        timingDistributionLoading: overdueStatistics2State['timingDistributionLoading'],
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getTableData: overdueStatistics2Action.osc2GetTableData,
        getTimingDistribution:overdueStatistics2Action.osc2GetTimingDistribution,
    }, dispatch);
}

OverdueStatistics2.propTypes = {
    intl: propTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OverdueStatistics2));

