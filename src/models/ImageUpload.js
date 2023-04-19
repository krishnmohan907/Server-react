const mongoose = require("mongoose");

const uploadImage = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

mongoose.model("UploadFile", uploadImage, "uploadfile");
