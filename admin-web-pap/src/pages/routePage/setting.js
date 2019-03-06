
import React, { PureComponent } from 'react';
import routePage from '../../../config/router.config.js'
import { Tree, Icon ,Card } from 'antd';
import { connect } from 'dva';
import { isUrl } from '@/utils/utils';
import { formatMessage, FormattedMessage } from 'umi/locale';
// import styles from './index.less';

// import IconFont from '@/components/IconFont';

const { TreeNode } = Tree;
const routeData = routePage[1].routes


// const getIcon = icon => {
//   if (typeof icon === 'string') {
//     if (isUrl(icon)) {
//       return <Icon component={() => <img src={icon} alt="icon" className={styles.icon} />} />;
//     }
//     if (icon.startsWith('icon-')) {
//       return <IconFont type={icon} />;
//     }
//     return <Icon type={icon} />;
//   }
//   return icon;
// };
const defaultCheck = [
  "/testPage/test",
  "/testPage",
  "/routePage",
  "/routePage/setting",
  "/dashboard/monitor",
  "/list/search/projects"
]

@connect(({ route, loading }) => ({
  route,
  loading: loading.models.route,
}))
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
  // onSelect = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info);
  // }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  onSubmit = ()=>{
    console.log(this.props)
    const { dispatch } = this.props;
    dispatch({
      type: 'route/submit',
      payload: {action,item},
    });
    console.log(this.state.routeData)
  }

  render() {
    return (

      <Card style={{ width: 600 }}
        actions={[<div onClick={this.onSubmit}>确认修改</div>]}>
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