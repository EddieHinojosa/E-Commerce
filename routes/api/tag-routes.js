const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  //find all tags with its associated product data
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
    }
});



router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const category = await Category.findByPK(req.params.id, {
      include: [{model: Product}],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(category); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update  tag's name by its `id` value
  try {
    const updateCateogry = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });
    if (!updateCategory) {
      res.status(404).json({Message: 'No category found with that id!'});
      return;
    } 
  res.status(200).json(updateCategory);
  } catch (err) {
  res.status(400).json(err);
  }
});





router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyCategory = await Category.destroy(req.params.id, {
      where: {
        id: req.params.id
      }
    });

    if (!destroyCategory) {
      res.status(404).json({message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(destroyCategory);
  } catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
