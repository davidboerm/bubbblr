const router = require('express').Router();
const messageRoutes = require('./messageRoutes');

router.use('/messages', messageRoutes);

module.exports = router;
