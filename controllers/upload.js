const User = require("../models/User");

// Upload User
module.exports.upload = async (req, res) => {
  try {
    let imgFile;
    let uploadPath;

    if (!req.files | Object.keys(req.files).length === 0) {
      return res.status(400).send('No files');
    }

    imgFile = req.files.img;
    uploadPath = __dirname + '/../images/' + imgFile.name;

    imgFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
    });
    let { img, userId, password, info } = req.body;
    img = imgFile.name;
    const user = new User({ img, userId, password, info });
    await user.save();
    return res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};