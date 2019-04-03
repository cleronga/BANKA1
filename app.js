import express from 'express';
import bankadata from './bankadata/bankadata';

// Set up the express app
const app = express();

// get all user

app.get('/api/v1/user', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'User log in..',
    user: bankadata,
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
