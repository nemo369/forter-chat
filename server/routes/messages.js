const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  res.json([{ message: 'Hello World 1' }, { message: 'Hello World 2' }]);
});

module.exports = router;
