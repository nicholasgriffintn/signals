const https = require('https');
const querystring = require('querystring');
const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({});
const cloudfront = new AWS.CloudFront();

exports.clearCloudfront = async (keys, quanity) => {
  return new Promise(function verifyPromise(resolve, reject) {
    const params = {
      DistributionId: process.env.CLOUDFRONT_DIST_ID,
      InvalidationBatch: {
        CallerReference: new Date().getTime().toString(),
        Paths: {
          Quantity: quanity || 1,
          Items: keys || ['/*'],
        },
      },
    };

    cloudfront.createInvalidation(params, function (err, data) {
      if (err) {
        console.error(err, err.stack);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.sendEmail = async (companyuid, mailObject) => {
  return new Promise(function verifyPromise(resolve, reject) {
    console.log(`sending email for company: ${companyuid}`);

    const params = {
      FunctionName: process.env.AWS_COMMS_LAMBDA_NAME_SENDEMAIL,

      Payload: JSON.stringify({
        queryStringParameters: {
          productguid: process.env.COMMS_PRODUCT_ID,
          companyuid: companyuid || 'DefaultCompany',
        },
        body: mailObject,
      }),
    };

    lambda.invoke(params, (err, data) => {
      if (err || !data) {
        if (err) {
          console.error(err, err.stack);
          reject(err);
        } else {
          console.error('SendEmail call failed.');
          reject('SendEmail call failed.');
        }
      } else {
        resolve(data);
      }
    });
  });
};

const host = 'hcaptcha.com';
const path = '/siteverify';

// verifies the given token by doing an HTTP POST request
// to the hcaptcha.com/siteverify endpoint by passing the
// hCaptcha secret key and token as the payload.
const verify = (secret, token, ipaddress, sitekey) => {
  return new Promise(function verifyPromise(resolve, reject) {
    // stringify the payload
    const data = querystring.stringify({ secret, response: token });

    // set up options for the request
    // note that we're using form data here instead of sending JSON
    const options = {
      host,
      path,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': Buffer.byteLength(data),
      },
    };

    // make the request, add response chunks to buffer, and finally resolve
    // with the response. if any errors arise call the promise's reject
    // function with the error.
    const request = https.request(options, (response) => {
      response.setEncoding('utf8');

      let buffer = '';

      response
        .on('error', reject)
        .on('data', (chunk) => (buffer += chunk))
        .on('end', () => resolve(JSON.parse(buffer)));
    });

    request.on('error', reject);
    request.write(data);
    request.end();
  });
};

exports.verifyHCaptchaFromResource = async (tokenPassed, sitekeyPassed) => {
  return new Promise(function verifyPromise(resolve, reject) {
    const ip = '';

    const secret = process.env.CAPTCHA_VERIFY_TOKEN;
    const sitekey = sitekeyPassed || process.env.CAPTCHA_SITE_KEY;
    const token = tokenPassed;

    verify(secret, token, ip, sitekey)
      .then((data) => {
        if (data.success) {
          resolve(data.success);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(false);
      });
  });
};

exports.verifyHCaptcha = async (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  // &ip=${ip}

  const secret = process.env.CAPTCHA_VERIFY_TOKEN;
  const sitekey = req.body.sitekey || process.env.CAPTCHA_SITE_KEY;
  const token = req.body.response;

  verify(secret, token, ip, sitekey)
    .then((data) => {
      return res.status(200).send({
        status: data.success,
        data,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        status: 'Error',
        message: err,
      });
    });
};
