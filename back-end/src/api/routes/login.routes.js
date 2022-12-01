const { Router } = require('express');
const { login } = require('../controllers/user.controller');

const router = Router();

router.post('/', login);

module.exports = router;