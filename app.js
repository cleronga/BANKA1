
import bodyParser from 'body-parser';

const express = require('express');
const bankadata = require('./ApiEndpoint/bankadata');

// Set up the express app

const app = express();
// parser request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all user

app.get('/api/v1/user', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'User log in..',
    user: bankadata,
  });
});
app.post('/api/v/user', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      success: 'false',
      message: 'Email is required',
    });
  } if (!req.body.firstName) {
    return res.status(400).send({
      success: 'false',
      message: 'First Name is required',
    });
  } if (!req.body.lastName) {
    return res.status(400).send({
      success: 'false',
      message: 'Last Name is required',
    });
  } if (!req.body.password) {
    return res.status(400).send({
      success: 'false',
      message: 'password  is required',
    });
  } if (!req.body.ctype) {
    return res.status(400).send({
      success: 'false',
      message: 'client type  is required',
    });
  } if (!req.body.isAdmin) {
    return res.status(400).send({
      success: 'false',
      message: 'Staff type is required  is required',
    });
  }
  const user = {
    id: bankadata.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    ctype: req.body.ctype,
    isAdmin: req.body.isAdmin,
  };
  bankadata.push(user);
  return res.status(200).send({
    success: 'true',
    message: 'User created successfully',
    user,
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
