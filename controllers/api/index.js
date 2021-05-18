const router = require('express').Router();
const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const tagRoutes = require('./tagRoutes');

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
