const Product = require('../database/models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id)
    if (!product) {
      return res.status(400).json({ errors: [{ msg: 'Product not found' }] })
    }
    req.product = product;
    console.log(req.product);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when making Product Id check')
  }
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }
    const { name, description, price, category, quantity, shipping } = fields;
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'Image must be less than 1Mb size' })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json(err)
      }
      res.json(result)
    })
  })
}

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ message: 'Product deleted successfully' })
  })
}

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Image could not be uploaded' })
    }
    const { name, description, price, category, quantity, shipping } = fields;
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({ error: 'Image must be less than 1Mb size' })
      }
      product.photo.data = fs.readFileSync(files.photo.path)
      product.photo.contentType = files.photo.type
    }
    product.save((err, result) => {
      if (err) {
        return res.status(400).json(err)
      }
      res.json(result)
    })
  })
}
