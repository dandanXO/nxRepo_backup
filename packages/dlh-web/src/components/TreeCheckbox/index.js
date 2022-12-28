import React, { useState, useRef, useEffect } from "react";
import { Table, Input, Checkbox } from "antd";
const { Search } = Input;
import styled from "styled-components";

const TreeCheckboxStyle = styled.div`
  background: lightskyblue;
  text-align: left;

  .ant-table-row-level-0 {
    text-align: left;
  }

  .ant-table-row.ant-table-row-level-1 {
    display: inline-block;
    padding-left: 30px;
    td {
      min-width: 100px;
      &.ant-table-row-expand-icon-cell {
        min-width: 0px;
      }
      &.ant-table-selection-column {
        min-width: 0px;
      }
    }
  }

  .ant-table-expanded-row-level-2 {
    background: #fff;
    padding-left: 30px;
    text-align: left;
  }

  .hide-expand-icon + tr.ant-table-expanded-row-level-1 {
    display: none;
  }

  tr {
    td {
      border: 0px;
    }
  }
`;
export default () => {
  const initialData = useRef([]);
  const [data, setData] = useState([
    {
      key: "1",
      title: "催收階段1",
      children: [
        {
          key: "1-1",
          parent: "1",
          title: "商戶1",
          checkboxData: [
            { key: 12, title: "eric" },
            { key: 13, title: "eric2" },
            { key: 14, title: "eric3" },
          ],
        },
        {
          key: "1-2",
          parent: "1",
          title: "商戶2",
          checkboxData: [
            { key: 15, title: "eric4" },
            { key: 16, title: "eric5" },
            { key: 17, title: "eric6" },
          ],
        },
      ],
    },
    {
      key: "2",
      title: "催收階段2",
      children: [
        {
          key: "2-1",
          parent: "2",
          title: "商戶1",
          checkboxData: [
            { key: 18, title: "eric" },
            { key: 19, title: "eric2" },
            { key: 20, title: "eric3" },
          ],
        },
        {
          key: "2-2",
          parent: "2",
          title: "商戶2",
          checkboxData: [
            { key: 21, title: "eric4" },
            { key: 22, title: "eric5" },
            { key: 23, title: "eric6" },
          ],
        },
      ],
    },
  ]);
  useEffect(() => {
    initialData.current = [...data]; //设置初始化值
  }, []);


  const [expandedRowKeys, setExpandedRowKeys] = useState([]); //设置展开的 row

  // const [selectedRowKeys, setSelectedRowKeys] = useState(["1", "2", "1-2"]); //设置选择的 level1, level2 row
  // const [checkedJob, setCheckedJob] = useState([12]); //设置选择的 level3，人ㄩㄢf
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //设置选择的 level1, level2 row
  const [checkedJob, setCheckedJob] = useState([]); //设置选择的 level3，人ㄩㄢf


  const [selectAllDisabled, setSelectAllDisabled] = useState(false); //选择的时候，禁止全选
  //搜索岗位时，进行过滤
  // const loop = (searchValue) => {
  //   let loopData = initialData.current && initialData.current.map((item) => {
  //     let parentKey = !!~item.title.indexOf(searchValue);
  //     let childrenData = [];
  //     if (item.checkboxData) {
  //       //如果存在二级，则进行二级的循环,过滤出搜索到的value
  //       childrenData = item.checkboxData.filter(
  //         (d) => !!~d.title.indexOf(searchValue)
  //       );
  //     }
  //     //1.如果一级有，二级没有，则展示一级下所有的二级
  //     //2.如果一级没有，二级有，则只展示存在的二级以及对应的一级
  //     //3.如果一级有，二级有，则展示则存在的二级以及对应的一级
  //     //4.如果一级没有，二级也没有，则不展示
  //     if (parentKey && !childrenData.length) {
  //       return {
  //         title: item.title,
  //         key: item.key,
  //         checkboxData: item.checkboxData,
  //       };
  //     } else if ((!parentKey || parentKey) && childrenData.length) {
  //       return {
  //         title: item.title,
  //         key: item.key,
  //         checkboxData: childrenData,
  //       };
  //     } else {
  //     }
  //   });
  //   setSelectAllDisabled(searchValue ? true : false);
  //   //有数据时自动展开所有搜索到的，无数据的时候默认全部收起
  //   setExpandedRowKeys(
  //     searchValue ? initialData.current.map((d) => d.key) : []
  //   );
  //   return searchValue ? loopData.filter((d) => d) : initialData.current;
  // };

  const isContained = (a, b) => {
    if (!(a instanceof Array) || !(b instanceof Array)) return false;
    if (a.length < b.length) return false;
    var aStr = a.toString();
    for (var i = 0, len = b.length; i < len; i++) {
      if (aStr.indexOf(b[i]) == -1) return false;
    }
    return true;
  }

  const checkChange = (e) => {
    console.log("checkChange.e", e)

    let parentRowsKey = [];

    // initialData.current.forEach((v) => {
    //   if (v.checkboxData.find((d) => d.key === e.target.value)) {
    //     parentRowsKey = v.key;
    //   }
    // });

    // let level = null;

    // 點擊催收階段
    // initialData.current.forEach((stage) => {
    //   if (!stage.children) return;
    //
    //   if(stage.key === e.target.value) {
    //     let newCheckedJob = [];
    //     let newSelectedRowKeys = [...selectedRowKeys]
    //     stage.children.map(merchant => {
    //       merchant.checkboxData.map(collector => {
    //         newCheckedJob.push(collector.key)
    //       })
    //       newSelectedRowKeys = [...newSelectedRowKeys, merchant.key]
    //     })
    //     newSelectedRowKeys = [...newSelectedRowKeys, stage.key]
    //     setSelectedRowKeys(newSelectedRowKeys);
    //     level = "stage";
    //   }
    // });

    // if(level !== "stage") {
      //找到点击child到一级key
      initialData.current.forEach((level1) => {
        // console.log("level1", level1)
        level1.children.forEach(level2 => {
          // console.log("level2", level2)
          const isFind = level2 && level2.checkboxData && level2.checkboxData.find((person) => {
            // console.log("person", person)
            return person.key === e.target.value
          });
          if (isFind) {
            // setSelectedRowKeys([...selectedRowKeys, e.target.value])
            parentRowsKey.push(level1.key)
            parentRowsKey.push(level2.key)
          }
        })
      });
      console.log("parentRowsKey", parentRowsKey);



    // }

    const data = initialData.current
    console.log("data", data);

    // NOTE: 全部催收階段
    let allStage = data && data.map((i) => i.key);
    console.log("allStage", allStage);

    // NOTE: 當前選擇催收階段
    let currentSelectedStage = data && data.find((d) => d.key === parentRowsKey[0]);
    console.log("currentSelectedStage", currentSelectedStage);

    // NOTE: 全部商戶
    let currentAllMerchant = currentSelectedStage && currentSelectedStage.children.map((d) => d.key);
    console.log("currentAllMerchant", currentAllMerchant);



    // NOTE: parentRowsKey
    // 0 催收階段
    // 1 商戶
    if (e.target.checked) {

      // if(level !== "stage") {
        //判断当前child的内容是否全部被选中，如果全部选中，则需要设置selectedRowKeys
        //parentRowsKey 下的所有子元素



        // NOTE: 當前選擇全部商戶
        let currentSelectedAllMerchant = currentSelectedStage && currentSelectedStage.children.find((d) => d.key === parentRowsKey[1]);
        console.log("currentSelectedAllMerchant", currentSelectedAllMerchant);


        // NOTE: 當前商戶有不論選擇的全部人員
        let currentAllCollector = currentSelectedAllMerchant && currentSelectedAllMerchant.checkboxData.map((i) => i.key);
        console.log("currentAllCollector", currentAllCollector);

        //NOTE: 動作選中人員
        let newCheckedJob = [...checkedJob, e.target.value];
        setCheckedJob(newCheckedJob);


        // 判斷全部已選人員
        const checkedAllCollector = newCheckedJob.filter(o => currentAllCollector.indexOf(o) > -1);
        console.log("已選人員", checkedAllCollector);

        let newSelectedRowKeys = [...selectedRowKeys];

        // NOTE: 人員全選，商戶單選
        if(checkedAllCollector.length === currentAllCollector.length) {
          newSelectedRowKeys = [...selectedRowKeys, parentRowsKey[1]];
          // NOTE: 把商戶塞入陣列
          // setSelectedRowKeys(newSelectedRowKeys);
          console.log("把商戶塞入陣列: ", parentRowsKey[1]);

        }
        console.log("newSelectedRowKeys", newSelectedRowKeys);

        // NOTE: 判斷已選商戶
        // let selectedAllMerchantArray = newSelectedRowKeys.filter(o => currentAllMerchant.filter(p => o === p))
        // selectedAllMerchantArray = selectedAllMerchantArray.filter(o => currentAllMerchant.indexOf(o) > -1);
        let selectedAllMerchantArray = newSelectedRowKeys.filter(o => currentAllMerchant.indexOf(o) > -1);
        console.log("已選商戶", selectedAllMerchantArray);


        if(selectedAllMerchantArray.length === currentAllMerchant.length) {
          // NOTE: 把催收階段塞入陣列
          console.log("把催收階段塞入陣列: ", parentRowsKey[0]);
          newSelectedRowKeys = [...newSelectedRowKeys, parentRowsKey[0]];
        }
        console.log("newSelectedRowKeys", newSelectedRowKeys);

        setSelectedRowKeys(newSelectedRowKeys);

      // }


    } else {
      console.log("selectedRowKeys", selectedRowKeys);

      console.log("取消");

      // if(level !== "stage") {
        // NOTE: 取消人員後
        setCheckedJob(
          [...checkedJob].filter((d) => d !== e.target.value)
        );

        let newSelectedRowKeys = [];
        // NOTE: 取消人員後，取消商戶選擇
        if (!!~selectedRowKeys.indexOf(parentRowsKey[1])) {
          newSelectedRowKeys =  [...selectedRowKeys].filter((d) => d !== parentRowsKey[1]);
        }

        // NOTE: 取消商戶後，取消階段選擇
        if (!!~selectedRowKeys.indexOf(parentRowsKey[0])) {
          newSelectedRowKeys =  [...newSelectedRowKeys].filter((d) => d !== parentRowsKey[0])
        }

        console.log("newSelectedRowKeys", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      // } else {
        // NOTE: 取消人員後
        // setCheckedJob(
        //   [...checkedJob].filter((d) => d !== e.target.value)
        // );
      // }

    }

  };

  // console.log("selectedRowKeys", selectedRowKeys);
  // console.log("checkedLevel2Job", checkedLevel2Job);
  // console.log("checkedJob", checkedJob);
  //控制表格的展开收起
  const onExpand = (expanded, record) => {
    console.log("onExpand.record", record);
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
      setSelectedRowKeys([...selectedRowKeys, record.key]);
      //更新child数组，将selectParentData中的数据全部过滤添加
      setCheckedJob(Array.from(new Set([...checkedJob, ...selectParentData])));
    } else {
      //从父级数组中移除key值
      setSelectedRowKeys(
        [...selectedRowKeys].filter((d) => d !== record.key)
      );
      //更新child数组，将selectParentData中的数据全部过滤掉
      let newArr = [];
      [...checkedJob].forEach((v) => {
        if (selectParentData.indexOf(v) === -1) {
          newArr.push(v);
        }
      });
      setCheckedJob(newArr);
    }
  };
  const expandedRowRender = (record, index, indent, expanded) => {
    // console.log("expandedRowRender.record", record);
    // console.log("expandedRowRender.index", index);
    // console.log("expandedRowRender.indent", indent);
    // console.log("expandedRowRender.expanded", expanded);
    if(!record.checkboxData) return;

    // return null;
    return (
      <div style={{ paddingLeft: 50, boxSizing: "border-box" }}>
        <div>
          <Checkbox.Group value={checkedJob} style={{
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
    selectedRowKeys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log("record", record);
      console.log("selected", selected);
      console.log("selectedRows", selectedRows);
      console.log("nativeEvent", nativeEvent);
      console.log("selectedRowKeys", selectedRowKeys);

      if(record.children) {

        // 催收階段
        console.log("催收階段")
        if(selected) {
          const allMerchantKey = record.children.map(merchant => merchant.key);
          const newSelectedRowKeys = [...selectedRowKeys, record.key, ...allMerchantKey, ];
          setSelectedRowKeys(newSelectedRowKeys);

          // collector
          let allPerson = []
          record.children.map(merchant => {
            const currentAllPerson = merchant.checkboxData.map(collector => collector.key);
            allPerson = [...allPerson, ...currentAllPerson];
          })
          setCheckedJob([...checkedJob, ...allPerson]);

        } else {
          const allMerchantKey = record.children.map(merchant => merchant.key);
          setSelectedRowKeys(
            selectedRowKeys
              .filter(key => key !== record.key)
              .filter(key => allMerchantKey.indexOf(key) === -1)
          )

          // collector
          let allPerson = []
          record.children.map(merchant => {
            const currentAllPerson = merchant.checkboxData.map(collector => collector.key);
            allPerson = [...allPerson, ...currentAllPerson];
          })
          setCheckedJob(
            checkedJob.filter(collector => allPerson.indexOf(collector) === -1)
          );
        }
      } else {
        // 商戶階段
        console.log("商戶階段")

        if(!record.checkboxData) return;

        if(selected) {

          // self
          setSelectedRowKeys([...selectedRowKeys, record.key]);

          // collector
          const currentAllPerson = record.checkboxData.map(collector => collector.key);
          setCheckedJob([...checkedJob, ...currentAllPerson]);

        } else {
          // self
          setSelectedRowKeys(
            selectedRowKeys.filter(key => key !== record.key)
          );

          // collector
          const currentAllPerson = record.checkboxData.map(collector => collector.key);
          setCheckedJob(
            checkedJob.filter(collector => currentAllPerson.indexOf(collector) === -1)
          );
        }

      }


    }
    // getCheckboxProps: (record: any) => ({
    //   disabled: selectAllDisabled,
    // }),
  //   renderCell: (checked, record) => {
  //     console.log("renderCell.checked", checked);
  //     console.log("renderCell.record", record);
  //
  //     //当前record.key对应大初始化数据的一级所有数据
  //     let parentArr = initialData && initialData.current && initialData.current.find(
  //       (d) => d.key === record.key
  //     );
  //     //从所有已经选择过的数据中过滤出在parentArr中的数据
  //     let checkArr = parentArr && parentArr.checkboxData && parentArr.checkboxData.filter(
  //       (item) => checkedJob.indexOf(item.key) > -1
  //     );
  //     return (
  //       <Checkbox
  //         indeterminate={ parentArr && parentArr.checkboxData &&  checkArr && !!checkArr.length && checkArr.length < parentArr.checkboxData.length
  //             ? true
  //             : false
  //         } //比较 当过滤后选中数据的长度 < 初始化数据的长度时，设置 indeterminate 状态为true，否则为false
  //         onClick={(e) => onClick(e, record)}
  //         checked={checked}
  //         disabled={selectAllDisabled}
  //       ></Checkbox>
  //     );
  //   },
  };
  return (
    <TreeCheckboxStyle
      style={{
        background: "#fff",
        padding: 24,
        boxSizing: "border-box",
        width: 982,
      }}
    >
      {/*<Search*/}
      {/*  placeholder="请输入岗位名称"*/}
      {/*  onSearch={(value) => {*/}
      {/*    console.log(loop(value));*/}
      {/*    setData(loop(value));*/}
      {/*  }}*/}
      {/*/>*/}
      <Table
        showHeader={false}
        columns={columns}
        expandedRowRender={expandedRowRender}
        onExpand={onExpand}
        expandedRowKeys={expandedRowKeys}
        dataSource={data}
        pagination={false}
        rowSelection={rowSelection}
        indentSize={40}
        rowClassName={record => record.checkboxData ? '' : 'hide-expand-icon'}
      />
    </TreeCheckboxStyle>
  );
};
const columns = [{ title: "title", dataIndex: "title", key: "title" }];
