var express = require('express');
const { upload } = require('../config/fileconfig');
const { isSignedIn, isAuthenticated } = require('../controllers/auth_controller');

const {
  uploadFileResult,
} = require('../controllers/uploadfile_controller');
const { getUserById } = require('../controllers/user_controller');
var router = express.Router();

router.param('userId', getUserById)

//Post
router.post(
  '/:userId',
  isSignedIn,
  isAuthenticated,
  upload.single('file'),
  uploadFileResult
);

module.exports = router;