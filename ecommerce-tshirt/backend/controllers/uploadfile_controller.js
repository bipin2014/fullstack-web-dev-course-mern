const UploadFile = require('../models/upload_file');

exports.uploadFileResult = async (req, res) => {
  req.body.user = req.user._id;
  req.body.field_name = req.body.name;
  req.body.url = req.file.path;
  const uploadFile = new UploadFile(req.body);
  try {
    const createdUploadFile = await uploadFile.save()
    res.json(createdUploadFile);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || 'Error Upload File' });
  }
};