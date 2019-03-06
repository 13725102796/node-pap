
import React, { PureComponent } from 'react';
import routePage from '../../../config/router.config.js'
import { Tree, Icon } from 'antd';
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

class CardList extends PureComponent {
  state = { };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
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
    console.log(parent)
    parent = parent || ''
    console.log(item)
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
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    

    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        {this.getNavMenuItems(routeData)}
      </Tree>
    );
  }
}

export default CardList;