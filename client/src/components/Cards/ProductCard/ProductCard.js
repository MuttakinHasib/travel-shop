import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import styles from './ProductCard.module.css';
import { Button, Carousel } from 'antd';
import { Button as CartButton } from '@geist-ui/react';

import { HeartTwoTone } from '@ant-design/icons';

const ProductCard = ({ product, loading }) => {
  return (
    <motion.div
      className={`my-3 col-lg-3 col-md-4 col-sm-6`}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div className={styles.productCard} whileHover={{ opacity: 0.9 }}>
        <Link to={`/product/${product._id}`}>
          <Carousel autoplay>
            {product?.images.map(image => (
              <motion.div className={styles.productImage} key={image?.uid}>
                <img
                  src={`http://localhost:5000/${image?.response?.file}`}
                  alt={image?.name}
                  className={styles.image}
                />
              </motion.div>
            ))}
          </Carousel>
          <motion.div
            className={styles.productInfo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.productDescription}>
              <div className='d-flex justify-content-between align-items-center'>
                <strong className='text-gray-800'>{product?.title}</strong>
                <span className='text-gray-600'>${product?.price}</span>
              </div>
              {product?.description && (
                <p className='text-center text-gray-600 mb-0 pt-2'>
                  {product?.description}
                </p>
              )}
            </div>
          </motion.div>
        </Link>
        <div className={`${styles.cardButton} p-3`}>
          <div className='d-flex justify-content-between align-items-center'>
            <CartButton type='success-light' auto size='small'>
              Add to cart
            </CartButton>
            <Button
              type='link'
              shape='circle'
              icon={
                <HeartTwoTone
                  twoToneColor='#f36'
                  style={{ fontSize: '25px' }}
                />
              }
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const mapStateToProps = state => ({ loading: state.product.loading });

export default connect(mapStateToProps)(ProductCard);
