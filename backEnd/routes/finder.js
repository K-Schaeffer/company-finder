var express = require('express');
var router = express.Router();

/* External Modules */
const PDFDocument = require('pdfkit');
var fs = require('fs');
const { Base64Encode } = require('base64-stream');
const nodemailer = require('nodemailer');
const request = require('request-promise');

var name, email, cnpj; // Req data

router.get('/:cnpj', function (req, res) { // The main route

  /* Getting CNPJ */

  name = req.headers.name;
  email = req.headers.email;
  cnpj = req.params.cnpj;

  let api_url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;

  request.get(api_url).then(response => {
    res.status(200).send(generatePdf(response));
  }).catch(e => {
    res.send(e);
  });

});

function generatePdf(companyInfo) { // Function to generate PDF and Convert to Base64

  const companyObj = JSON.parse(companyInfo);

  var doc = new PDFDocument({
    size: 'LEGAL',
    info: {
      Title: 'Finder Result'
    }
  });

  doc.text("Company's Information", {
    align: 'center'
  });

  doc.text(`
  Name: ${companyObj.nome}\n
  Main Activity: ${companyObj.atividade_principal[0].text}\n
  Status: ${companyObj.situacao}\n
  Status up to: ${companyObj.data_situacao}\n
  Telephone: ${companyObj.telefone}\n
  E-mail: ${companyObj.email}\n`, {
    align: 'justify'
  });

  var finalString = '';
  var stream = doc.pipe(new Base64Encode());

  doc.end();

  stream.on('data', function (chunk) {
    finalString += chunk;
  });

  stream.on('end', function () {
    console.log('PDF is done');
    sendEmail(finalString);
  })
} // Closing function generatePdf()

async function sendEmail(content) { // Function to send the email

  require('dotenv/config');

  try {
    console.log(process.env.HOST);
    console.log(process.env.PORT);
    console.log(process.env.USER);
    console.log(process.env.PASS);

    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })

    let info = await transporter.sendMail({
      from: `Company Finder <${process.env.EMAIL}> `,
      to: email,
      subject: 'Company Finder Result',
      text: `Hello ${name}, here's the file with the company ${cnpj} information.`,
      attachments: [
        {
          filename: `information.pdf`,
          content,
          encoding: 'base64'
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);

  } catch (err) {
    console.log(err);
  }



} // Closing function sendEmail()


module.exports = router;
