import React, { Component } from 'react';
import {IntlContext} from '../api/IntlContext';
import { Menu, Dropdown, Icon } from 'antd';

const menu = (state) => (
  <Menu>
    <Menu.Item>
      <a onClick={state.switchToEN}>ENG</a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={state.switchToCN}>简</a>
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