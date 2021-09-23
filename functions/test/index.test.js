const test = require('firebase-functions-test')();

const functions = require('firebase-functions');

test.mockConfig({ stripe: { key: '23wr42ewr34' }});

const myFunctions = require('../index.js'); // relative path to functions code

adminInitStub = sinon.stub(admin, 'initializeApp');
// Now we can require index.js and save the exports inside a namespace called myFunctions.
myFunctions = require('../index');