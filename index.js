const fs = require("fs");
const { parse } = require("csv-parse");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  pool: true,
  secure: false,
  auth: {
    user: "codeio@bmsce.ac.in",
    pass: "nlvivghmlzbgrxzz",
  },
});

const templateSender = (data, relativePath) => {
  let htmlTemp;
  ejs.renderFile(path.join(__dirname, relativePath), data, (err, html) => {
    if (err) {
      console.log("Error rendering the file", err);
      return;
    }
    htmlTemp = html;
  });
  return htmlTemp;
};

const newRegisterMail = (data, i) => {
  const htmlStr = templateSender({ data: data }, "/email.ejs");
  transporter.sendMail(
    {
      from: "codeio@bmsce.ac.in",
      to: data.email,
      subject: `Senior Core Recruitment Drive 2025 - CodeIO`,
      html: htmlStr,
      // attachments: [{
      //     filename: 'GO.jpg',
      //     path: path.join(__dirname, './GO.jpg'),
      //     contentType: 'image/jpeg'
      // }]
    },
    (err, info) => {
      if (err) {
        console.log("error at i", i);
        console.log("Error in sending the mail", err);
        return;
      }
      //console.log(info)
    }
  );
};

let i = 1;

let arrData = [];

let faculty = [
    `namratham.cse@bmsce.ac.in`,
    `syedakram.cse@bmsce.ac.in`,
    `selva.cse@bmsce.ac.in`,
    `amrutham.cs21@bmsce.ac.in`,
    `shravanth.cs21@bmsce.ac.in`,
    `safwan.cs21@bmsce.ac.in`,
    `prithvips.cs21@bmsce.ac.in`,
    `saatvik.cs21@bmsce.ac.in`
]

// let tempData = [
//   'safwan.cs21@bmsce.ac.in'
// ]

// const readStream = fs.createReadStream("./5Semester.csv");

// readStream
//   .pipe(parse({ delimiter: ",", from_line: 457, to_line: 480 }))
//   .on("data", (row) => {
//     arrData.push(row);
//   })
//   .on("end", () => {
//     sendFinal(arrData);
//     console.log("MAIL SENDING FINISHED!!!");
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   });


function sendFinal(data) {
  data.forEach((element) => {
    const temp = {};
    // temp.name=element[3];
    // temp.email = element[6];
    temp.email = element
    newRegisterMail(temp, i);
    console.log(`mail sent to ${temp.email}`);
    i++;
  });
}

sendFinal(faculty)