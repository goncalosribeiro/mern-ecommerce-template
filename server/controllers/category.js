const Category = require('../database/models/category');

exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err, data) => {
    if (err) {
      return res.status(400).json(err)
    }
    res.json({ data })
  })
}