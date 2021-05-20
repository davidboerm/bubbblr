const router = require('express').Router();
const messageRoutes = require('./messageRoutes');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const tagRoutes = require('./tagRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/tags', tagRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
