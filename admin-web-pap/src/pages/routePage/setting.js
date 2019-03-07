
import React, { PureComponent } from 'react';
import routePage from '../../../config/router.config.js'
import { message, Button , Tree, Icon ,Card } from 'antd';
import { connect } from 'dva';
import { isUrl } from '@/utils/utils';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { reloadAuthorized } from '@/utils/Authorized';
const { TreeNode } = Tree;
const routeData = routePage[1].routes
const defaultCheck = eval(JSON.parse(localStorage.getItem('routeData')))

@connect(({ route, loading }) => {
  console.log(route)
  console.log(loading)
  return {
    route,
    submitting: loading.effects['route/submit'],
  }
  
})
class CardList extends PureComponent {
  state = {
    routeData: []
  };
  componentDidMount(){
    this.setState({
      routeData: defaultCheck
    })
  }

  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);

  };
  getSubMenuOrItem = (item,parent) => {
    // doc: add hideChildrenInMenu
    parent = parent || ''
    if (item.routes && !item.hideChildrenInMenu ) {
      const { name } = item;
      // const parentName = parent ? parent + '.' + item.name : '.' + item.name
      return (
        <TreeNode
          title={formatMessage({ id: 'menu.' + (parent && parent + '.' ) + item.name })}
          key={item.path}
        >
          {this.getNavMenuItems(item.routes, (parent && parent + '.') + item.name) }
        </TreeNode>
      );
    }
    return <TreeNode title={formatMessage({ id: 'menu.' + (parent && parent + '.' ) + item.name })} key={item.path}></TreeNode>;
  };
  onCheck = (checkedKeys, info) => {
    this.setState({
          routeData: checkedKeys
        })
    console.log('onCheck', checkedKeys, info);
  }
  onSubmit = ()=>{
    // console.log(this.props)
    const { dispatch } = this.props;
    console.log(this.state.routeData)
    const newData = JSON.stringify(this.state.routeData)
    dispatch({
      type: 'route/submit',
      payload: newData
    }).then((res)=>{
      message.success(res.msg);
      // alert(newData)
      

      localStorage.setItem('routeData', newData)
      // reloadAuthorized();
      location.reload()
      // 刷新页面
      
    });
    // console.log(this.state.routeData)
  }

  render() {
    const { submitting } = this.props;
    
    // console.log(typeof defaultCheck)
    // console.log(Array.isArray(defaultCheck))
    return (

      <Card style={{ width: 600 }}
        actions={[<Button onClick={this.onSubmit} loading={submitting} type="primary" ghost>确认修改</Button>]}>
        <Tree
          checkable
          defaultCheckedKeys={defaultCheck}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          {this.getNavMenuItems(routeData)}
        </Tree>
      </Card>
    );
  }
}

export default CardList;