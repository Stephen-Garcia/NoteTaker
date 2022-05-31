const router = require('express').Router();
const path = require('path');
const noteRoutes = require('./notes');

router.use('/notes', noteRoutes);

module.exports = router;