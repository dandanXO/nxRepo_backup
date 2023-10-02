import React, { Component } from 'react';
import {IntlContext} from '../api/IntlContext';
import { Menu, Dropdown, Icon } from 'antd';
import { qiankunActions } from "../../index";

const menu = (state) => (
  <Menu>
    <Menu.Item>
      <a onClick={() => {
        state.switchToEN();
        qiankunActions.setGlobalState({locale: 'en'});
      }}>ENG</a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={() => {
        state.switchToCN();
        qiankunActions.setGlobalState({locale: 'cn'});
      }}>简</a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={() => {
        state.switchToES();
        qiankunActions.setGlobalState({locale: 'es'});
      }}>Español</a>
    </Menu.Item>
  </Menu>
);

class LanguageSwitch extends Component{
  constructor(...args){
    super(...args);
  }




  render(){
    return (
      <IntlContext.Consumer>
        {(state) =>(
          <div>
            <Dropdown overlay={menu(state)}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Icon type="global" style={{ margin : '1em'}} />
              </a>
            </Dropdown>
          </div>
        )}

      </IntlContext.Consumer>
    );
  }




}

export default LanguageSwitch;
