const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;
app.get("/", async (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
    const data = `India, officially the Republic of India, is a country in South Asia. It is the seventh largest country by area, the second most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast` // req.body.file or data

  const python = await spawn("python", ["C:/Users/alaam/OneDrive/Desktop/mybrary/PROJECT/Searchable_Encryption/indexing.py", data]);
// spawn new child process to call the python script
// const python = spawn('python', ['script2.py','node.js','python']);

  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });
});

app.get('/encrypt', async (req, res)=> {

  const python = await spawn("python", ["C:/Users/alaam/OneDrive/Desktop/mybrary/PROJECT/Searchable_Encryption/encrypt_index.py"]);
// spawn new child process to call the python script
// const python = spawn('python', ['script2.py','node.js','python']);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });
})

app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);



