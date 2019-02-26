import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import { Card, Button, Icon, List, Modal, Form, Input } from 'antd';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './test.less';
const FormItem = Form.Item;
@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
@Form.create()
class CardList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/fetch',
      payload: {
        count: 8,
      },
    });
  }
  showEditModal = (item)=>{
    this.setState({
      visible: true,
      current: item,
    });
  }
  // showAddModal=()=>{
  //   this.setState({
  //     visible: true,
  //     current: undefined,
  //   });
  // }
  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'test/submit',
      payload: { id },
    });
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    // setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  }
  handleCancel = ()=>{
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  }
  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };
  

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      test: { list },
      loading,
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };
    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'del') {
        Modal.confirm({
          title: '删除操作',
          content: '确定删除吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };
    
    
   
    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          {/* <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem> */}
          {/* <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem> */}
          {/* <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem> */}
        </Form>
      );
    };

    const modalFooter = { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    return (
      <PageHeaderWrapper >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            grid={{ gutter: 24, xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (
                <List.Item key={item.id}>
                  <Card hoverable className={styles.card} actions={[<a onClick={e => {
                        e.preventDefault();
                        editAndDelete('edit',item);
                      }}>编辑</a>, <a onClick={e => {
                        e.preventDefault();
                        editAndDelete('del',item);
                      }}>删除</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.img} />}
                      title={<a>{item.title}</a>}
                      description={
                        <Ellipsis className={styles.item} lines={3}>
                          {item.desc}
                        </Ellipsis>
                      }
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" 
                    onClick={this.showEditModal}
                    ref={component => {
                      /* eslint-disable */
                      this.addBtn = findDOMNode(component);
                      /* eslint-enable */
                    }}
                    className={styles.newButton}>
                    <Icon type="plus" /> 新建产品
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
        <Modal
          title={`任务${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={{ padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;