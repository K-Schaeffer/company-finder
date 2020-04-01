# Company Finder :mortar_board: |  [![LinkedIn][linkedin-shield]][linkedin-url] 

This is a "study-alone" project which I consider my **first full-stack web developer** project.
<br>
Of course that there's lots of functionalities to improve, especially the code by itself.
<br>
The point is that I made it totally hands-on, so, It's kind of a sample project, do not expect a masterpiece.
<br>

**Note**: I had pushed both the back-end and the front-end in one single commit because this project has sensitive data,
so I needed to make it safe before put it here, and I didn't knew how to do that, which I know now.
<br>

## Check it out :stuck_out_tongue_winking_eye:

![Overview](https://i.imgur.com/wXtgBvy.gif)

## At the email :eyes:

![Overview Pt. 2](https://i.imgur.com/uV63g8p.gif)
This one doesnt have a email :grin:

## Built with :computer:

* Front-End 
  * [X] [Ionic](https://ionicframework.com/docs/) - Front-end Framework used to make the project look prettier and increase functionalities
    * [X] [BR-Masker](https://github.com/amarkes/br-mask) - Module used to generate the CNPJ mask
  * [X] [Angular](https://angular.io/docs) - Front-end Framework used with Ionic to make all front-end functionalities
  
* Back-End
  * [X] [NodeJS](https://nodejs.org/en/) - JS Back-end runtime
      * [X] [Express](https://www.npmjs.com/package/express) - Node package that I used to generate my server
      * [X] [PDFKit](https://pdfkit.org) - Module used to generate a PDF file
      * [X] [Base-Encode](https://www.npmjs.com/package/nodejs-base64-encode) - Module used to encode my PDF to base-64 encode
      * [X] [NodeMailer](https://nodemailer.com/about/) - Module used to send the email with the PDF as attatchment
      * [X] [DotEnv](https://www.npmjs.com/package/dotenv) - Module used to protect sensitive data

* API
  * [X] [Receita/WS](https://receitaws.com.br/api) - The api that will provide the CNPJ information

## Functionality

Basically, when you send the form in the front-end `(localhost:8100)`, It will consume the back-end `(localhost:2000)` which will go to a route that wil consume the Receita/WS.
<br>
Once that's done, the back-end will take the information that I setted as pattern, and generate a PDF with that inside.
<br>
When the PDF is finished, it will convert it to base-64, and then, finally, configure the email and put this base64 as attachment, and send to the user with a custom message.

## Usage

You should just clone this repository
<br>
`git clone url`
<br>
And then install npm dependencies
<br>
`npm i`
<br>
With that done, and of course, all "built with" section topics installed, you need to create a .env file in the project root directory.
<br>
In this file, you need to fill the information that will be used to send the email.
<br>
`HOST=` <br>
`PORT=` <br>
`USER=` <br>
`PASS=` <br>
`EMAIL=` <br>
<br>
**Note**: Use `ionic serve` to run Ionic-Angular project, and `npm start`to run NodeJS Express server.





[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/k-schaeffer/
