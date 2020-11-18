import React, { useState } from 'react';
import { Button, Input, Text, Textarea } from '@geist-ui/react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import FileUpload from '../../components/FileUpload/FileUpload';
import { getProduct, uploadProduct } from '../../Redux/actions/productActions';
// import { getUploadedImages } from '../../components/FileUpload/FileUpload';

const UploadProduct = ({ auth, getProduct, uploadProduct, history }) => {
  const [formData, setFormData] = useState({
    writer: '',
    title: '',
    description: '',
    price: '',
    images: [],
  });

  const { title, description, price } = formData;

  const onChange = text => e =>
    setFormData({ ...formData, [text]: e.target.value });

  const handleImages = images =>
    setFormData({ ...formData, images: [...images] });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await uploadProduct(formData);
      history.push('/');
      // await getProduct();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className='mt-5'>
        <h2 className='text-center'>Upload Product</h2>
        <form onSubmit={onSubmit}>
          <div className='row'>
            <div className='col-md-6'>
              <FileUpload uploadImages={handleImages} />
            </div>
            <div className='col-md-4'>
              <div className='my-3'>
                <Input
                  placeholder='Post title'
                  width='100%'
                  value={title}
                  onChange={onChange('title')}
                >
                  <Text h4>Title</Text>
                </Input>
              </div>
              <div className='my-3'>
                <Input
                  placeholder='Add price'
                  width='100%'
                  value={price}
                  onChange={onChange('price')}
                >
                  <Text h4>Price</Text>
                </Input>
              </div>
              <div className='my-3'>
                <Text h4>Description</Text>
                <Textarea
                  width='100%'
                  // value={value}
                  // onChange={handler}
                  placeholder='Write description here...'
                  value={description}
                  onChange={onChange('description')}
                />
              </div>
              <div className='my'>
                <Button
                  htmlType='submit'
                  auto
                  type='secondary-light'
                  onSubmit={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { uploadProduct, getProduct })(
  UploadProduct
);
