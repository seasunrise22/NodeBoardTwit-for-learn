const express = require('express');
const multer = require('multer');
const { uploadFakeNotice } = require('../controllers/fake');

const router = express.Router();

const upload2 = multer();
router.post('/notice', upload2.none(), uploadFakeNotice);

module.exports = router;