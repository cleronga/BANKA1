const express = require('express');

const app = express();
app.use(express.json());


const users = [

  {
    token: 'TCsOorgZhnYHxgapPsq1F915',
    id: 451,
    email: 'roclena@gmail.com',
    firstName: 'Roger',
    lastName: 'clement',
    password: 'Ishimwe@1987',
    type: 'client',
    isAdmin: false,

  },
];
// all user account
app.get('/api/v1/users', (req, res) => {
  res.send({
    status: 200,
    data: users,
  });
});
// create account
app.post('/api/v1/users/auth/signup', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      status: 400,
      message: 'Email is required',
    });
  } if (!req.body.firstName) {
    return res.status(400).send({
      status: 400,
      message: 'First Name is required',
    });
  } if (!req.body.lastName) {
    return res.status(400).send({
      status: 400,
      message: 'Last Name is required',
    });
  } if (!req.body.password || req.body.password.length < 7) {
    return res.status(400).send({
      status: 400,
      message: 'password  is required and shul be a minimum of 8charachers',
    });
  } if (!req.body.type) {
    return res.status(400).send({
      status: 400,
      message: 'client type  is required',
    });
  } if (!req.body.isAdmin) {
    return res.status(400).send({
      status: 400,
      message: 'Staff type is required  is required',
    });
  }
  const user = {

    token: 'TCsOorgZhnYHxgapPsq1F915',
    id: users.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    type: 'client',
    isAdmin: 'false',

  };
  users.push(user);
  res.status(201).send({
    status: 201,
    data: {
      token: user.token,
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      type: user.type,
      isAdmin: user.isAdmin,
    },
  });
});
// create staff user or admin

// user sign in
const usersignin = [];
app.post('/api/v1/auth/signin', (req, res) => {
  const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
  const si = usersignin.find(u => u.email === req.body.email);

  if (si) {
    return res.status(400).send({
      status: 400,
      message: 'user arleady sign in!!',
    });
  }
  if (user) {
    const us = {
      token: user.token,
      id: usersignin.length + 1,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: user.type,
      isAdmin: user.isAdmin,
    };
    usersignin.push(us);
    return res.status(200).send({
      status: 200,
      data: {
        token: us.token,
        id: us.id,
        email: us.email,
        firstName: us.firstName,
        lastName: us.lastName,
        type: us.type,
        isAdmin: us.isAdmin,
      },
    });
  }
  return res.status(404).send({
    status: 404,
    message: 'Invalid email or password',
  });
});
// login users
app.get('/api/v1/signin', (req, res) => {
  res.send({
    status: 200,
    data: usersignin,
  });
});
// update user account
app.put('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id, 10));
  if (!user) res.status(404).send('user not exist');
  if (!req.body.email) {
    return res.status(400).send({
      status: 400,
      message: 'Email is required',
    });
  } if (!req.body.firstName) {
    return res.status(400).send({
      status: 400,
      message: 'First Name is required',
    });
  } if (!req.body.lastName) {
    return res.status(400).send({
      status: 400,
      message: 'Last Name is required',
    });
  } if (!req.body.password || req.body.password.length < 7) {
    return res.status(400).send({
      status: 400,
      message: 'password  is required and shul be a minimum of 8charachers',
    });
  }
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.password = req.body.password;
  user.type = req.body.type;
  user.isAdmin = req.body.isAdmin;
  res.send({
    status: 200,
    data: {
      token: user.token,
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      type: user.type,
      isAdmin: user.isAdmin,
    },
  });
});
// delete account

app.delete('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send('user not exist');
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(204).send({
    status: 204,
    message: 'User successfully deleted',
  });
});
// search user account
app.get('/api/v1/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send('user not exist');

  res.send({
    status: 200,
    data: {
      token: user.token,
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      type: user.type,
      isAdmin: user.isAdmin,
    },
  });
});
// account code
const accounts = [
  {
    id: 3000,
    accountNumber: 345,
    createOn: '10/04/2019',
    owner: 451,
    type: 'saving',
    status: 'draft',
    balance: 0.0,

  },
];
app.get('/api/v1/accounts', (req, res) => {
  res.send({
    status: 200,
    data: accounts,
  });
});
app.post('/api/v1/accounts', (req, res) => {
  if (!req.body.accountNumber || req.body.length < 4) {
    return res.status(400).send({
      status: 400,
      message: 'Account Number is required',
    });
  } if (!req.body.owner) {
    return res.status(400).send({
      status: 400,
      message: 'owner Id is required',
    });
  } if (!req.body.type) {
    return res.status(400).send({
      status: 400,
      message: 'AccountType type  is required',
    });
  }
  const user = users.find(a => a.id === parseInt(req.body.owner));
  const ac = accounts.find(a => a.id === parseInt(req.body.owner));

  if (!user) {
    return res.status(404).send({
      status: 404,
      message: 'user does not exist',
    });
  } if (ac) {
    return res.status(401).send({
      status: 401,
      message: 'This user arleady have account',
    });
  }

  const account = {

    id: accounts.length + 1,
    accountNumber: req.body.accountNumber,
    createOn: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    owner: req.body.owner,
    type: req.body.type,
    status: req.body.status,
    balance: req.body.balance,

  };
  accounts.push(account);
  res.status(201).send({
    status: 201,
    data: {

      id: account.id,
      accountNumber: account.accountNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: account.type,
      status: account.status,
      balance: account.balance,
    },
  });
});

app.patch('/api/v1/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.accountNumber === parseInt(req.params.id));
  if (!account) res.status(404).send('Acount does not exist');
  if (!req.body.status) {
    return res.status(400).send({
      status: 400,
      message: 'Account status  is required',
    });
  }
  account.status = req.body.status;
  res.status(200).send({
    status: 200,
    data: {

      id: account.id,
      accountNumber: account.accountNumber,
      createOn: account.createOn,
      owner: account.owner,
      type: account.type,
      status: account.status,
      balance: account.balance,
    },
  });
});

app.delete('/api/v1/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.accountNumber === parseInt(req.params.id));
  if (!account) {
    res.status(404).send({
      status: 404,
      message: 'Account does not exist',
    });
  }
  const index = accounts.indexOf(account);
  accounts.splice(index, 1);
  res.status(200).send({
    status: 200,
    message: 'account successfully deleted',
  });
});
// search account

app.get('/api/v1/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.accountNumber === parseInt(req.params.id));
  if (!account) {
    res.status(404).send({
      status: 404,
  		message: 'Account does not exist',
 		});
  }

  res.status(200).send({
    status: 200,
    data: {
      id: account.id,
      accountNumber: account.accountNumber,
      createOn: account.createOn,
      owner: account.owner,
      type: account.type,
      status: account.status,
      balance: account.balance,
    },
  });
});

// traansaction side
const transactions = [
  {
    id: 3000,
    createOn: '10/04/2019',
    type: 'debit',
    accountNumber: 345,
    cashier: 2,
    amount: 9000,
    oldBalance: 10000,
    balance: 1000,

  },
];
app.get('/api/v1/transactions', (req, res) => {
  res.send({
    status: 200,
    data: transactions,
  });
});
app.post('/api/v1/transactions/:id/debit', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.body.cashierid) && u.type === 'staff' && u.isAdmin === 'false');
  const account = accounts.find(a => a.accountNumber === parseInt(req.params.id));
  if (!account) {
    return res.status(404).send({
      status: 404,
      message: 'Account does not exist',
    });
  }
  if (!req.body.amount) {
    return res.status(400).send({
      status: 400,
      message: 'amount is required',
    });
  } if (account.balance < req.body.amount) {
    return res.status(403).send({
      status: 403,
      message: 'provide amount less than the balance',
    });
  } if (!req.body.cashierid) {
    return res.status(400).send({
      status: 400,
      message: 'cashier Id is required',
    });
  } if (!user) {
    return res.status(403).send({
      status: 403,
  		message: 'not allowed to perfom this transaction',
 		});
  }
  const transaction = {
 	transactionId: transactions.length + 1,
 	type: 'Debit',
 	createOn: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
 	accountNumber: req.params.id,
 	cashierId: user.id,
 	amount: req.body.amount,
 	oldBalance: account.balance,
 	newBalance: account.balance - req.body.amount,
  };
 	res.status(200).send({
 		status: 200,
 		data: {
 			transactionId: transaction.transactionId,
 			accountNumber: account.accountNumber,
 			amount: req.body.amount,
 			cashier: user.id,
 			transactionType: 'Debit',
 			accountBalance: `${transaction.newBalance}`,
 		},
 	});
});
app.post('/api/v1/transactions/:id/credit', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.body.cashierid) && u.type === 'staff' && u.isAdmin == 'false');
  const account = accounts.find(a => a.accountNumber === parseInt(req.params.id));
  if (!account) {
    return res.status(404).send({
  	status: 404,
  	message: 'Account does not exist',
    });
  }
  if (!req.body.amount) {
    return res.status(400).send({
      status: 400,
      message: 'amount is required',
    });
  } if (!req.body.cashierid) {
    return res.status(400).send({
      status: 400,
      message: 'cashier Id is required',
    });
  } if (!user) {
	 return res.status(403).send({
  	tatus: 403,
  	message: 'not allowed to perfom this transaction',
    });
  }
  const transaction = {
 	transactionId: transactions.length + 1,
 	type: 'credit',
 	createOn: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
 	accountNumber: req.params.id,
 	cashierId: user.id,
 	amount: req.body.amount,
 	oldBalance: account.balance,
 	newBalance: account.balance + req.body.amount,
  };
 	account.balance = transaction.newBalance;
 	res.status(200).send({
 		status: 200,
 		data: {
 			transactionId: transaction.transactionId,
 			accountNumber: account.accountNumber,
 			amount: req.body.amount,
 			cashier: user.id,
 			transactionType: 'credit',
 			accountBalance: `${transaction.newBalance}`,
 		},
 	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
