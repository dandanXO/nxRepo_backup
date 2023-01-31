import React, { useState, useRef, useEffect } from "react";
import { Table, Checkbox } from "antd";
import styled from "styled-components";

const TreeCheckboxStyle = styled.div`
  background: lightskyblue;
  text-align: left;

    // 催收階段
    .ant4-table-cell {
        order: 3;
    }

    // +
    .ant4-table-cell.ant4-table-row-expand-icon-cell {
        order: 1;
    }

    // checkbox
    .ant4-table-cell.ant4-table-selection-column {
        order: 2;
    }



  // 階段
  .ant4-table-row-level-0 {
      display: flex;
    text-align: left;
    //font-weight: 700;
      td {
          min-width: 800px;
          &.ant4-table-row-expand-icon-cell {
              min-width: 0px;
          }
          &.ant4-table-selection-column {
              min-width: 0px;
          }
      }

  }

  //商戶
  .ant4-table-row-level-1 {
      display: flex;
    padding-left: 30px;
    //min-width: 1000px;
    text-align: left;
    td {
      min-width: 770px;
      &.ant4-table-row-expand-icon-cell {
        min-width: 0px;
      }
      &.ant4-table-selection-column {
        min-width: 0px;
      }
    }
  }

  //團隊
  .ant4-table-row-level-2 {
      display: flex;
    padding-left: 51px;
    text-align: left;
    td {
      min-width: 750px;
      &.ant4-table-row-expand-icon-cell {
        min-width: 0px;
      }
      &.ant4-table-selection-column {
        min-width: 0px;
      }
    }
  }

  // 催收人
  .ant4-table-expanded-row-level-3 {
      display: flex;
      flex-flow: column;
      padding-left: 105px;
      background: #fff;
  }


  // 隱藏催收下方 tr
  .hide-expand-icon + tr.ant4-table-expanded-row-level-1 {
    display: none;
  }

  // 隱藏團隊下方 tr
  .hide-expand-icon + tr.ant4-table-expanded-row-level-2 {
    display: none;
  }

  tr {
    td {
      border: 0px;
    }
  }
`;

const columns = [{ title: "title", dataIndex: "title", key: "title" }];


interface TreeCheckboxProps {
    data: any;
    selectedRowKeys: any;
    setSelectedRowKeys: any;
    onCheck: (checkedJob: any) => void;
    checkedJob: any;
    setCheckedJob: any;
}

export const TreeCheckbox =  (props: TreeCheckboxProps) => {
  const initialData = useRef([]);

  const [data, setData] = useState();
  // const [data, setData] = useState([
  //   {
  //     key: "1",
  //     title: "催收階段1",
  //     level: "stage",
  //     children: [
  //       {
  //         key: "1-1",
  //         title: "商戶1",
  //         level: "merchant",
  //         children: [
  //           {
  //             key: "team-1",
  //             title: "團隊1",
  //             level: "team",
  //             checkboxData: [
  //               { key: 1, title: "eric1" },
  //               { key: 2, title: "eric2" },
  //               { key: 3, title: "eric3" },
  //             ],
  //           },
  //           {
  //             key: "team-2",
  //             title: "團隊2",
  //             level: "team",
  //             checkboxData: [
  //               { key: 4, title: "eric4" },
  //               { key: 5, title: "eric5" },
  //               { key: 6, title: "eric6" },
  //             ],
  //           },
  //         ]
  //       },
  //       {
  //         key: "1-2",
  //         parent: "1",
  //         title: "商戶2",
  //         level: "merchant",
  //         children: [
  //           {
  //             key: "team-3",
  //             title: "團隊3",
  //             level: "team",
  //             checkboxData: [
  //               { key: 7, title: "eric7" },
  //               { key: 8, title: "eric8" },
  //               { key: 9, title: "eric9" },
  //             ],
  //           },
  //           {
  //             key: "team-4",
  //             title: "團隊4",
  //             level: "team",
  //             checkboxData: [
  //               { key: 10, title: "eric10" },
  //               { key: 11, title: "eric11" },
  //               { key: 12, title: "eric12" },
  //             ],
  //           },
  //         ]
  //       },
  //     ],
  //   },
  //   {
  //     key: "2",
  //     title: "催收階段2",
  //     level: "stage",
  //     children: [
  //       {
  //         key: "2-1",
  //         parent: "2",
  //         title: "商戶1",
  //         level: "merchant",
  //         children: [
  //           {
  //             key: "team-5",
  //             title: "團隊5",
  //             level: "team",
  //             checkboxData: [
  //               { key: 13, title: "eric13" },
  //               { key: 14, title: "eric14" },
  //               { key: 15, title: "eric15" },
  //             ],
  //           },
  //           {
  //             key: "team-6",
  //             title: "團隊6",
  //             level: "team",
  //             checkboxData: [
  //               { key: 16, title: "eric16" },
  //               { key: 17, title: "eric17" },
  //               { key: 18, title: "eric18" },
  //             ],
  //           },
  //         ]
  //       },
  //       {
  //         key: "2-2",
  //         parent: "2",
  //         title: "商戶2",
  //         level: "merchant",
  //         children: [
  //           {
  //             key: "team-7",
  //             title: "團隊7",
  //             level: "team",
  //             checkboxData: [
  //               { key: 19, title: "eric19" },
  //               { key: 20, title: "eric20" },
  //               { key: 21, title: "eric21" },
  //             ],
  //           },
  //           {
  //             key: "team-8",
  //             title: "團隊8",
  //             level: "team",
  //             checkboxData: [
  //               { key: 22, title: "eric22" },
  //               { key: 23, title: "eric23" },
  //               { key: 24, title: "eric34" },
  //             ],
  //           },
  //         ]
  //       },
  //     ],
  //   },
  // ]);

  useEffect(() => {
      if(props.data) {
          initialData.current = [...props.data]; //设置初始化值
          setData(props.data)
      }
  }, [props.data]);

  // useEffect(() => {
  //   initialData.current = [...data]; //设置初始化值
  // }, []);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]); //设置展开的 row

  useEffect(() => {
    props.onCheck(props.checkedJob);
  }, [props.checkedJob]);

  const checkChange = (e) => {
    // console.log("checkChange.e", e)

    let parentRowsKey = [];

    const data = initialData.current
    // console.log("data", data);

    data.forEach((stage) => {
      // console.log("stage", stage)
      stage.children.forEach(merchant => {
        // console.log("merchant", merchant)
        merchant.children.forEach((team) => {
          const isFind = team && team.checkboxData && team.checkboxData.find((collector) => {
            return collector.key === e.target.value
          });
          if (isFind) {
            parentRowsKey.push(stage.key)
            parentRowsKey.push(merchant.key)
            parentRowsKey.push(team.key)
          }
        })
      })
    });
    // console.log("parentRowsKey", parentRowsKey);


    // NOTE: 全部催收階段
    let allStage = data && data.map((i) => i.key);
    // console.log("allStage", allStage);

    // NOTE: 當前選擇催收階段
    let currentSelectedStage = data && data.find((d) => d.key === parentRowsKey[0]);
    // console.log("currentSelectedStage", currentSelectedStage);

    // NOTE: 全部商戶
    let currentAllMerchant = currentSelectedStage && currentSelectedStage.children.map((d) => d.key);
    // console.log("currentAllMerchant", currentAllMerchant);

    // NOTE: 當前選擇全部商戶
    let currentSelectedAllMerchant = currentSelectedStage && currentSelectedStage.children.find((d) => d.key === parentRowsKey[1]);
    // console.log("currentSelectedAllMerchant", currentSelectedAllMerchant);

    // NOTE: 全部 Team
    let currentAllTeam = currentSelectedAllMerchant && currentSelectedAllMerchant.children.map((d) => d.key);
    // console.log("currentAllTeam", currentAllTeam);

    // NOTE: 當前選擇 Team
    let currentSelectedTeam
      currentSelectedAllMerchant && currentSelectedAllMerchant.children.map((team) => {
      if(team.key === parentRowsKey[2]) {
        currentSelectedTeam = team;
      }
    });

    // console.log("currentSelectedTeam", currentSelectedTeam);

    // NOTE: parentRowsKey
    // 0 催收階段
    // 1 商戶
    if (e.target.checked) {


      // NOTE: 當前商戶有不論選擇的全部人員
      let currentAllCollector = currentSelectedTeam && currentSelectedTeam.checkboxData.map((i) => i.key);
      // console.log("currentAllCollector", currentAllCollector);

      //NOTE: 動作選中人員
      let newCheckedJob = [...props.checkedJob, e.target.value];
        props.setCheckedJob(newCheckedJob);

      // 判斷全部已選人員
      const checkedAllCollector = newCheckedJob.filter(o => currentAllCollector.indexOf(o) > -1);
      // console.log("已選人員", checkedAllCollector);

      let newSelectedRowKeys = [...props.selectedRowKeys];

      // NOTE: 人員全選，team 單選
      if(checkedAllCollector.length === currentAllCollector.length) {
        newSelectedRowKeys = [...props.selectedRowKeys, parentRowsKey[2]];
        // NOTE: 把 team 塞入陣列
        // setSelectedRowKeys(newSelectedRowKeys);
        // console.log("把team塞入陣列: ", parentRowsKey[2]);
      }
      // console.log("newSelectedRowKeys", newSelectedRowKeys);

      // NOTE: 判斷已選 team
      // let selectedAllMerchantArray = newSelectedRowKeys.filter(o => currentAllMerchant.filter(p => o === p))
      // selectedAllMerchantArray = selectedAllMerchantArray.filter(o => currentAllMerchant.indexOf(o) > -1);
      let selectedAllTeam = newSelectedRowKeys.filter(o => currentAllTeam.indexOf(o) > -1);
      // console.log("已選 team", selectedAllTeam);


      if(selectedAllTeam.length === currentAllTeam.length) {
        // NOTE: 把商戶塞入陣列
        // console.log("把商戶塞入陣列: ", parentRowsKey[1]);
        newSelectedRowKeys = [...newSelectedRowKeys, parentRowsKey[1]];
      }
      // console.log("newSelectedRowKeys", newSelectedRowKeys);

      // setSelectedRowKeys(newSelectedRowKeys);


      // NOTE: 判斷已選 商戶
      let selectedAllMerchant = newSelectedRowKeys.filter(o => currentAllMerchant.indexOf(o) > -1);
      // console.log("已選 merchant", selectedAllMerchant);

      if(selectedAllMerchant.length === currentAllMerchant.length) {
        // NOTE: 把催收塞入陣列
        // console.log("把催收塞入陣列: ", parentRowsKey[0]);
        newSelectedRowKeys = [...newSelectedRowKeys, parentRowsKey[0]];
      }
      // console.log("newSelectedRowKeys", newSelectedRowKeys);
        props.setSelectedRowKeys(newSelectedRowKeys);

    } else {
      // console.log("取消 parentRowsKey", parentRowsKey);

      // NOTE: 取消人員後
        props.setCheckedJob(
        [...props.checkedJob].filter((d) => d !== e.target.value)
      );

      let newSelectedRowKeys = [...props.selectedRowKeys];

      // NOTE: 取消人員後，取消 team 選擇
      if (!!~props.selectedRowKeys.indexOf(parentRowsKey[2])) {
        newSelectedRowKeys =  newSelectedRowKeys.filter((d) => d !== parentRowsKey[2]);
        // console.log("1.newSelectedRowKeys", newSelectedRowKeys);
      }

      // NOTE: 取消team後，取消商戶選擇
      if (!!~props.selectedRowKeys.indexOf(parentRowsKey[1])) {
        newSelectedRowKeys =  newSelectedRowKeys.filter((d) => d !== parentRowsKey[1]);
        // console.log("2.newSelectedRowKeys", newSelectedRowKeys);
      }

      // NOTE: 取消商戶後，取消階段選擇
      if (!!~props.selectedRowKeys.indexOf(parentRowsKey[0])) {
        newSelectedRowKeys =  newSelectedRowKeys.filter((d) => d !== parentRowsKey[0])
        // console.log("3.newSelectedRowKeys", newSelectedRowKeys);
      }
      // console.log("4.newSelectedRowKeys", newSelectedRowKeys);
        props.setSelectedRowKeys(newSelectedRowKeys);

    }

  };

  // console.log("selectedRowKeys", selectedRowKeys);
  // console.log("checkedLevel2Job", checkedLevel2Job);
  // console.log("checkedJob", checkedJob);
  //控制表格的展开收起
  const onExpand = (expanded, record) => {
    // console.log("onExpand.record", record);
    //expanded： true展开，false：关闭
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.key]);
    } else {
      setExpandedRowKeys(
        [...expandedRowKeys].filter((d) => d !== record.key)
      );
    }
  };

  // console.log("checkedJob", checkedJob);
  const onClick = (e, record) => {
    console.log("onClick.record", record);
    //存在搜索时，需要进行处理selectParentData
    let initialParent = initialData.current.find(
      (d) => d.key === record.key
    );
    let selectParentData = initialParent.checkboxData
      ? initialParent.checkboxData.map((d) => d.key)
      : [];
    if (e.target.checked) {
      //向选中数组中添加key值
        props.setSelectedRowKeys([...props.selectedRowKeys, record.key]);
      //更新child数组，将selectParentData中的数据全部过滤添加
        props.setCheckedJob(Array.from(new Set([...props.checkedJob, ...selectParentData])));
    } else {
      //从父级数组中移除key值
        props.setSelectedRowKeys(
        [...props.selectedRowKeys].filter((d) => d !== record.key)
      );
      //更新child数组，将selectParentData中的数据全部过滤掉
      let newArr = [];
      [...props.checkedJob].forEach((v) => {
        if (selectParentData.indexOf(v) === -1) {
          newArr.push(v);
        }
      });
        props.setCheckedJob(newArr);
    }
  };
  const expandedRowRender = (record, index, indent, expanded) => {
    // console.log("expandedRowRender.record", record);
    // console.log("expandedRowRender.index", index);
    // console.log("expandedRowRender.indent", indent);
    // console.log("expandedRowRender.expanded", expanded);
    if(!record.checkboxData) return;
    return (
      <div style={{
          paddingLeft: 0, boxSizing: "border-box"
      }}>
          <div>
              <Checkbox.Group value={props.checkedJob} style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
              }}>
                  {record.checkboxData && record.checkboxData.map((item) => {
                      return (
                          <Checkbox
                              key={item.key}
                              value={item.key}
                              onChange={checkChange}
                              style={{flex: "0 1 auto", marginLeft: 8, width: "20%"}}
                          >
                              {item.title}
                          </Checkbox>
                      );
                  })}
              </Checkbox.Group>
          </div>
      </div>
    );
  };
  const rowSelection = {
    selectedRowKeys: props.selectedRowKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      // console.log("record", record);
      // console.log("selected", selected);
      // console.log("selectedRows", selectedRows);
      // console.log("nativeEvent", nativeEvent);
      // console.log("selectedRowKeys", selectedRowKeys);

      if(record.level === "stage") {

        const allMerchantKey = record.children.map(merchant => merchant.key);

        const allTeamKey = []
        record.children.map(merchant => merchant.children.map(team => allTeamKey.push(team.key)));

        let allCollector = []
        record.children.map(merchant => {
          merchant.children.map(team => {
            const currentAllPerson = team.checkboxData.map(collector => collector.key);
            allCollector = [...allCollector, ...currentAllPerson];
          })
        })

        // 催收階段
        // console.log("催收階段")

        if(selected) {
          let newSelectedRowKeys = [...props.selectedRowKeys, record.key, ...allMerchantKey, ...allTeamKey];
            props.setSelectedRowKeys(newSelectedRowKeys);
            props.setCheckedJob([...props.checkedJob, ...allCollector]);
        } else {
          const allMerchantKey = record.children.map(merchant => merchant.key);
            props.setSelectedRowKeys(
                props.selectedRowKeys
              .filter(key => key !== record.key)
              .filter(key => allMerchantKey.indexOf(key) === -1)
              .filter(key => allTeamKey.indexOf(key) === -1)
          )
           props.setCheckedJob(
            props.checkedJob.filter(collector => allCollector.indexOf(collector) === -1)
          );
        }
      } else if(record.level === "merchant"){
        // 商戶階段
        // console.log("商戶階段")
        // if(!record.checkboxData) return;

        const allTeamKey = []
        record.children.map(team => allTeamKey.push(team.key));

        // merchant 下的 collector
        const currentAllCollector = []
        record.children.map(team => {
          team.checkboxData.map(collector => {
            currentAllCollector.push(collector.key);
          });
        })

        // 商戶都選擇後，加入催收階段
        const stage = initialData.current.filter(stage => stage.children.find(merchant => merchant.key === record.key))[0]
        const allMerchantKey = stage.children.map(team => team.key);

        if(selected) {
          // self, team
          let newSelectedRowKeys = [...props.selectedRowKeys, record.key, ...allTeamKey]
            props.setCheckedJob([...props.checkedJob, ...currentAllCollector]);

          // console.log("stage", stage);
          // console.log("allMerchantKey", allMerchantKey);
          // console.log("selectedRowKeys", selectedRowKeys);

          const selectedMerchantKeys = newSelectedRowKeys.filter(merchantKey => allMerchantKey.indexOf(merchantKey) > -1);
          // console.log("selectedMerchantKeys", selectedMerchantKeys);

          if(selectedMerchantKeys.length === allMerchantKey.length) {
            newSelectedRowKeys = [...newSelectedRowKeys, record.key, stage.key, ...allTeamKey];
          }

            props.setSelectedRowKeys(newSelectedRowKeys);

        } else {
          // self
            props.setSelectedRowKeys(
                props.selectedRowKeys
                .filter(key => key !== record.key)
                .filter(key => allTeamKey.indexOf(key) === -1)
                .filter(key => key !== stage.key)
              );

          // collector
            props.setCheckedJob(
                props.checkedJob.filter(collector => currentAllCollector.indexOf(collector) === -1)
            );

        }

      } else if(record.level === "team") {

        const currentAllCollector = record.checkboxData.map(collector => collector.key);

        let currentMerchant;
        initialData.current.filter(stage =>
          stage.children.map(merchant => {
            merchant.children.filter(team => {
              if(team.key === record.key) {
                currentMerchant = merchant;
              }
            })
          }))
        // console.log("currentMerchant", currentMerchant);

        let tempStage
        initialData.current.map(stage => {
          stage.children.map(
            merchant => {
              merchant.children.map((team => {
                if(team.key === record.key) {
                  // merchantKey = merchant.key;
                  tempStage = stage;
                }
              }))
            }
          )
        })

        // console.log("tempStage", tempStage);

        if(selected) {
          let newSelectedRowKeys = [...props.selectedRowKeys, record.key]

            props.setCheckedJob([...props.checkedJob, ...currentAllCollector]);

          //當 team 全部被選，merchant 要被勾選
          const allTeam = currentMerchant.children.map(team => team.key)
          const selectedTeam = newSelectedRowKeys
            .filter(selectedTeamkey => allTeam.indexOf(selectedTeamkey) > -1)
            .filter((item, index, arr) => {
              return arr.indexOf(item) === index;
            })

          // console.log("allTeam", allTeam);
          // console.log("selectedTeam", selectedTeam);

          if(selectedTeam.length === allTeam.length) {
            newSelectedRowKeys = [...newSelectedRowKeys, currentMerchant.key]
          } else {
            newSelectedRowKeys = newSelectedRowKeys.filter(key => key !== currentMerchant.key)
          }

          //當 team勾選 商戶也勾選，催收也要勾選
          // let merchantKey


          const allMerchantKey = tempStage.children.map(merchant => merchant.key);

          const selectedAllMerchant = newSelectedRowKeys.filter(key => allMerchantKey.indexOf(key) > -1);
          // console.log("allMerchantKey", allMerchantKey);
          // console.log("selectedAllMerchant", selectedAllMerchant);

          if(selectedAllMerchant.length === allMerchantKey.length) {
            newSelectedRowKeys = [...newSelectedRowKeys, tempStage.key]
          } else {
            newSelectedRowKeys = newSelectedRowKeys.filter(key => key !== tempStage.key)
          }
            props.setSelectedRowKeys(newSelectedRowKeys);

          // console.log("newSelectedRowKeys", newSelectedRowKeys);

        } else {

          const newSelectedRowKeys = props.selectedRowKeys
            .filter(key => key !== record.key)
            .filter(key => key !== currentMerchant.key)
            .filter(key => key !== tempStage.key);

          // console.log("selectedRowKeys", selectedRowKeys);
          // console.log("newSelectedRowKeys", newSelectedRowKeys);

            props.setSelectedRowKeys(newSelectedRowKeys);

          // collector
            props.setCheckedJob(
                props.checkedJob.filter(collector => currentAllCollector.indexOf(collector) === -1)
            );
        }

      }

    }
  };

  if(!data) return null;

  return (
    <TreeCheckboxStyle
      style={{
        background: "#fff",
        padding: 24,
        // boxSizing: "border-box",
      }}
    >
      <Table
        showHeader={false}
        columns={columns}
        expandable={{
            expandedRowRender,
            onExpand,
            expandedRowKeys,
        }}
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}
        indentSize={40}
        rowClassName={record => record.checkboxData ? '' : 'hide-expand-icon'}
      />
    </TreeCheckboxStyle>
  );
};

