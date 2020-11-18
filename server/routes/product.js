const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./uploads/', err => {
      cb(null, 'uploads/');
    });
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(new Error('only jpg,png are allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('file');

router.post('/uploadImage', auth, async (req, res) => {
  await upload(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });

    return res.status(200).json({
      image: res.req.file.path,
      file: `uploads/${res.req.file.filename}`,
    });
  });
});

router.post('/uploadProduct', auth, async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      author: req.user.id,
    });

    const product = await newProduct.save();

    if (!product) return res.status(400).json({ msg: 'Product upload failed' });

    res.status(200).json({ product, success: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/getProducts', auth, async (req, res) => {
  const { loadMore, search } = req.body;

  let order = req.body.order ? req.body.order : 'desc',
    sortBy = req.body.sortBy ? req.body.sortBy : '_id',
    limit = req.body.limit ? req.body.limit : 100,
    skip = parseInt(req.body.skip);

  try {
    let products;

    if (search) {
      products = await Product.find({ $text: { $search: search } })
        .populate('author', '-password')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit);
    } else {
      products = await Product.find()
        .populate('author', '-password')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit);
    }

    if (!products) return res.status(400).json({ msg: 'Product not founded' });
    res.status(200).json({
      products,
      postSize: products.length,
      loadMore,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
