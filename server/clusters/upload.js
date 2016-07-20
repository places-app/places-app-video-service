const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const BUCKET = process.env.BUCKET;
const updateRemoteUrl = require('../../utils/api').updateRemoteUrl;

function deleteVideo(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log('video has been deleted locally.', filePath);
  });
}

module.exports = () => {
  process.on('message', (uploadJob) => {
    // uploadJob format is { userPlaceId, videoUrl }
    const { userPlaceId, videoUrl } = uploadJob;
    const fileName = videoUrl.match(/\/([^/]*)$/)[1];
    const filePath = path.join(`${__dirname}./../../dist/videos/${fileName}`);
    const metaData = 'video/mov';
    fs.readFile(filePath, (err, fileBuffer) => {
      s3.upload({
        ACL: 'public-read',
        Bucket: BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: metaData,
      }, (error, res) => {
        if (!error) {
          console.log(`uploaded file to s3 ${fileName}`);
          deleteVideo(filePath);
          const s3videoUrl = res.Location;
          updateRemoteUrl(s3videoUrl, userPlaceId);
        } else {
          console.log(error);
        }
      });
    });
  });
};
