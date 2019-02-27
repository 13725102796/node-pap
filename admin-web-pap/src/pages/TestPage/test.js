import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import { Card, Button, Icon, List, Modal, Form, Input, Upload, message  } from 'antd';

import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './test.less';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = ['image/png','image/bmp','image/jpeg'].indexOf(file.type) > -1
  if (!isJPG) {
    // 您上传的图片格式不正确
    message.error('You can only upload JPG, bmp, png file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  // 获取上传签名秘钥
  // console.log(file)
  return isJPG && isLt2M;
}
const FormItem = Form.Item;
const { TextArea } = Input;
@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
@Form.create()
class CardList extends PureComponent {
  state = { visible: false, done: false, limit: 10,offect: 0 ,  loading: false,};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  componentDidMount() {
    this.getPageData()
  }
  getPageData(){
    const { dispatch } = this.props;
    const { limit, offect } = this.state;
    dispatch({
      type: 'test/fetch',
      payload: {
        limit,
        offect
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
      console.log(fieldsValue)
      dispatch({
        type: 'test/submit',
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
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  saveImage = (val)=>{
    console.log(val)
    var reader = new FileReader();
    reader.readAsDataURL(val.file)
    const that = this
    reader.onload=function(){
  //     console.log(this.result);
      that.setState({
        imageUrl: this.result
      })

      // console.log(that.state.current)
    }
    return true
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {
      test: { list,totalPage },
      loading,
      
    } = this.props;
    const { visible, done, current = {},limit } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: limit,
      total: totalPage || 0,
      onChange: (page, pageSize)=>{
        // 页码改变
        console.log(page,pageSize) 
      },
      onShowSizeChange: (current, size)=>{
        console.log(current, size )
        // pageSize 变化的回调
        this.setState({
          limit: size
        },function(){
          this.getPageData()
        });
        
      }

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
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text"><FormattedMessage id="test.upload" /></div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label={formatMessage({ id: 'test.name.label' })} {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: formatMessage({ id: 'test.name.placeholder' }) }],
              initialValue: current.title,
            })(<Input placeholder={formatMessage({ id: 'test.name.placeholder' })} />)}
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
          <FormItem label={formatMessage({ id: 'test.img.label' })} {...this.formLayout}>
            {getFieldDecorator('img', {
              rules: [{ required: true, message: formatMessage({ id: 'test.img.placeholder' }) }],
              initialValue: current.img,
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                customRequest={this.saveImage}
                onChange={this.handleChange}
              >
                {imageUrl ? <div className="ant-upload"><img src={imageUrl} alt="avatar"   /></div> : uploadButton}
              </Upload>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label={formatMessage({ id: 'test.desc.label' })}>
            {getFieldDecorator('desc', {
              rules: [{ message: formatMessage({ id: 'test.desc.placeholder' }) , min: 5 }],
              initialValue: current.desc,
            })(<TextArea rows={4} placeholder={formatMessage({ id: 'test.desc.placeholder' })} />)}
          </FormItem>
        </Form>
      );
    };

    const modalFooter = { okText: formatMessage({ id: 'test.save' }), onOk: this.handleSubmit, onCancel: this.handleCancel };

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
                      }}><FormattedMessage id="test.edit" /></a>, <a onClick={e => {
                        e.preventDefault();
                        editAndDelete('del',item);
                      }}><FormattedMessage id="test.del" /></a>]}>
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
                    <Icon type="plus" /> <FormattedMessage id="test.add-product" />
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
        <Modal
          /* title={`任务${current.id ? '编辑' : '添加'}`} */
          title={formatMessage({ id: current.id ? 'test.edit' : 'test.add-product' }) } 

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