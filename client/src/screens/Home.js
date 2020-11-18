import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { getProduct } from '../Redux/actions/productActions';
import { Row } from 'reactstrap';

import ProductCard from '../components/Cards/ProductCard/ProductCard';

import { Button } from '@geist-ui/react';
import SearchProducts from '../components/Search/SearchProducts';
const Home = ({ product, getProduct }) => {
  const [limit] = useState(8);
  const [skip, setSkip] = useState(0);
  // const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadData = { skip, limit };
    getProduct(loadData);
  }, []);

  const { products, postSize, loading } = product;

  const onLoadMore = () => {
    let skipPlus = skip + limit;
    const payload = {
      skip: skipPlus,
      limit,
      loadMore: true,
    };
    getProduct(payload);
    setSkip(skipPlus);
  };

  const handleFilters = search => {
    // setFilter(search);
    const payload = {
      skip: 0,
      limit,
      search,
    };

    setSkip(0);
    getProduct(payload);
  };

  return (
    <Container>
      <h3 className='text-center my-4'>Let's shopping today...</h3>
      <div className='text-right'>
        <SearchProducts filterProducts={handleFilters} />
      </div>
      {products.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{ height: 100 }}
          description={<h5 className='text-secondary'>No post yet...</h5>}
        />
      ) : (
        <>
          <Row>
            {products.map(product => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </Row>
          {postSize >= limit && (
            <div className='py-5 text-center'>
              <Button
                type='default'
                auto
                onClick={onLoadMore}
                loading={loading}
              >
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({ product: state.product });
export default connect(mapStateToProps, { getProduct })(Home);
