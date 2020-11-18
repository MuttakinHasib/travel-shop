import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../helpers/getBase64';

import { getCookie } from '../../helpers/auth';

import './FileUpload.css';

const FileUpload = ({ uploadImages }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });
  const { previewVisible, previewImage, fileList, previewTitle } = state;

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = ({ fileList }) => {
    setState({ ...state, fileList: [...fileList] });
    uploadImages([...fileList]);
  };

  // const onUpload = async file => {
  //   console.log(file);
  //   try {
  //     // const config = {
  //     //   headers: { 'Content-Type': 'application/json' },
  //     // };
  //     const res = await axios.post(
  //       'http://localhost:5000/api/product/uploadImage',
  //       file
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className='my-3'>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        // customRequest={onUpload}
        action='http://localhost:5000/api/product/uploadImage'
        name='file'
        headers={{ 'x-auth-token': getCookie('token') }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default FileUpload;
