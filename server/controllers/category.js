const Category = require('../database/models/category');

exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(400).json({ errors: [{ msg: 'Category not found' }] })
    }
    req.category = category;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error when making Category Id check')
  }
}

exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ data })
  })
}

exports.read = (req, res) => {
  return res.json(req.category)
}

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ data })
  })
}

exports.remove = (req, res) => {
  const category = req.category;

  category.remove((err, data) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ message: 'Category deleted successfully' })
  })
}

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ data })
  })
}