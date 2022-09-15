const express = require('express');
const router = express.Router();

//controller
const category = require('../controllers/category.js');

//categories page
router.get('/admin/categories', category.displayCategories);

//delete category
router.post('/admin/categories/delete/:idCategory', category.deleteCategory);

//'edit category' page
router.get('/admin/categories/edit/:idCategory', category.category_displayEdit);

//edit category
router.post('/admin/categories/edited', category.editCategory);

//'add category' page
router.get('/admin/categories/add', category.category_displayAdd);

//add category
router.post('/admin/categories/add', category.addCategory);

module.exports = router;