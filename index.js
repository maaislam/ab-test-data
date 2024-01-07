const AWS = require('aws-sdk');
require('dotenv').config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
exports.handler = async (event, context) => {
  const sheetObj = JSON.parse(event.body);
  const sheetName = sheetObj.sheetName;
  const sheetData = sheetObj.sheetData;
  const s3Bucket = 'ab-test-datastore'; // replace with your bucket name
  const objectName = `${sheetName}.json`; // File name which you want to put in s3 bucket
  const objectData = JSON.stringify(sheetData); // file data you want to put
  const objectType = 'application/json'; // type of file
  try {
    // setup params for putObject
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
      Body: objectData,
      ContentType: objectType,
    };
    const result = await s3.putObject(params).promise();
    console.log(`File uploaded successfully at https:/` + s3Bucket + `.s3.amazonaws.com/` + objectName);
    return { statusCode: 200, result: JSON.stringify(result) };
  } catch (error) {
    console.log('error');
  }
};
