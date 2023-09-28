const router = require('express').Router();
const v1Routes = require('./v1');

// use the router
router.use('/v1', v1Routes);

// export the router
module.exports = router;
