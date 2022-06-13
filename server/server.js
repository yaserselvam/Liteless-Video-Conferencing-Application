var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const app = express();
app.use(cors());

// app.use(express.json());

app.post("/login", (req, res) => {
  const uid = req.body.email;
  console.log(uid);
  admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {
      res.send({
        accessToken: customToken,
      });
      console.log(accessToken);
    })
    .catch((error) => {
      console.log("Error creating custom tokens:", error);
    });
});

app.listen(8001);
