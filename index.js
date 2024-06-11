// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const connectDB = async () => {
//   mongoose.connect("mongodb://127.0.0.1:27017/company-project");
//   const detailsSchema = new mongoose.Schema({});
//   const details = mongoose.model("details", detailsSchema);
//   const data = await details.find();
//   console.log(data);
// };
// connectDB();

const express = require("express");
const app = express();
const cors = require("cors");

const CompanyDetails = require("./db/CompanyDetails");
require("./db/config");

app.use(express.json());
app.use(cors());

app.post("/company", async (req, res) => {
  let details = new CompanyDetails(req.body);
  let result = await details.save();
  result = result.toObject();
  res.send(result);
});

app.put("/company/:id", async (req, res) => {
  console.log("Inside UPDATE product API ==>>>>> " + req.params.id);
  console.log(req.body);
  let result = await CompanyDetails.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.delete("/company/:id", async (req, res) => {
  console.log("req.params.id ===>>>> ", req.params.id);
  let result = await CompanyDetails.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/company/:id", async (req, res) => {
  let result = await CompanyDetails.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "client not found" });
  }
});

app.get("/company", async (req, res) => {
  let result = await CompanyDetails.find({});
  res.send(result);
});

app.listen(5000);
