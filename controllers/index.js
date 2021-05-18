const router = require('express').Router();
const routes = require('./routes.js');
const apiRoutes = require('./api');

router.use('/', routes);
router.use('/api', apiRoutes);

module.exports = router;
