const fs = require('fs/promises');
const path = require('path');

class ImageFileManager {
  static createImageUrl(imageFile) {
    return `http://localhost:4000/uploads/images/${imageFile.filename}`
  }
  
  static async deleteImageByUrl(imageUrl) {
    const fileToDelete = imageUrl && path.join(__dirname, `../../uploads/images/${imageUrl.split('/').pop()}`);
    if (fileToDelete) await fs.unlink(fileToDelete);
    return fileToDelete
  }
}

module.exports = ImageFileManager