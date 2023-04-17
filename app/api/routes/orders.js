const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders');


router.get('/sort', orderController.getAllWithShort);
router.get('/paginate', orderController.getordersWithPagination);

router.get('/', orderController.getAll);
router.post('/', orderController.create);
router.get('/:orderId', orderController.getById);
router.put('/:orderId', orderController.updateById);
router.delete('/:orderId', orderController.deleteById);
module.exports = router;