const { Router } = require('express');
const { register } = require('../controllers/user.controller');

const router = Router();

router.post('/', register);

module.exports = router;