/* eslint-disable */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
//const cors = require('cors')({origin: true});
var axios = require('axios');
const rp = require('request-promise');
admin.initializeApp();


/**
 * REQUEST FOR ADDING NEW USERS 
 */
exports.addNewResident = functions.database.ref('/residents/{updateID}')
    .onCreate( (snap, context) => {
      
      const createdData = snap.val(); // data that was created
      
      if(createdData.not_completed == 0){
        admin.auth().createUser({
            email: createdData.email,
            password: "."+createdData.phone+".",
        })
        .then(async function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            const token = await getToken();
            //await addExtensionQuery(createdData, token);
            await addExtensionQuery(createdData, token);

        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
        });
      }


    });

exports.addNewGuest = functions.database.ref('/guests/{updateID}')
    .onCreate( (snap, context) => {

      const createdData = snap.val(); // data that was created
      admin.auth().createUser({
          email: createdData.email,
          password: "."+createdData.phone+".",
      })
      .then(async function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
          const token = await getToken();
          //await addExtensionQuery(createdData, token);
          await addExtensionQuery(createdData, token);

      })
      .catch(function(error) {
          console.log("Error creating new user:", error);
      });

    });

exports.addNewDoormen = functions.database.ref('/doormen/{updateID}')
    .onCreate( (snap, context) => {

      const createdData = snap.val(); // data that was created
      
      admin.auth().createUser({
          email: createdData.email,
          password: "."+createdData.phone+".",
      })
      .then(async function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
          const token = await getToken();
          //await addExtensionQuery(createdData, token);
          await addDoormenExtensionQuery(createdData, token);

      })
      .catch(function(error) {
          console.log("Error creating new user:", error);
      });

      });

exports.addNewAdmin = functions.database.ref('/administrators/{updateID}')
    .onCreate( (snap, context) => {

      const createdData = snap.val(); // data that was created
      
      if(createdData.not_completed == 0){
        admin.auth().createUser({
            email: createdData.email,
            password: "."+createdData.phone+".",
        })
        .then(async function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            const token = await getToken();
            //await addExtensionQuery(createdData, token);
            await addAdminExtensionQuery(createdData, token);

        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
        });
      }


    });

/**
 * REQUEST FOR DELETING USERS 
 */

exports.deleteResident = functions.database.ref('/residents/{updateID}')
 .onDelete(async (snap, context) => {

      // Grab the current value of what was written to the Realtime Database.
      const deletedData = snap.val(); // data that was created
      const token = await getToken();
      deleteExtension(deletedData.phone, token);
      const keys = Object.keys(deletedData);
      console.log('Deleted data', deletedData);
      console.log('Keys of Deleted data', deletedData);
  
      admin
        .auth()
        .getUserByEmail(deletedData.email)
        .then((userRecord) => {
  
          admin
            .auth()
            .deleteUser(userRecord.uid)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully deleted user', userRecord.toJSON());
              
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
        })
        .catch((error) => {
          console.log('Error deleting user data:', error);
      });
 });

exports.deleteGuest = functions.database.ref('/guests/{updateID}')
 .onDelete(async (snap, context) => {

      // Grab the current value of what was written to the Realtime Database.
      const deletedData = snap.val(); // data that was created
      const token = await getToken();
      deleteExtension(deletedData.phone, token);
      const keys = Object.keys(deletedData);
      console.log('Deleted data', deletedData);
      console.log('Keys of Deleted data', deletedData);
  
      admin
        .auth()
        .getUserByEmail(deletedData.email)
        .then((userRecord) => {
  
          admin
            .auth()
            .deleteUser(userRecord.uid)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully deleted user', userRecord.toJSON());
              
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
        })
        .catch((error) => {
          console.log('Error deleting user data:', error);
      });
 });

exports.deleteAdmin = functions.database.ref('/administrators/{updateID}')
 .onDelete(async (snap, context) => {

      // Grab the current value of what was written to the Realtime Database.
      const deletedData = snap.val(); // data that was created
      const token = await getToken();
      deleteExtension(deletedData.phone, token);
      const keys = Object.keys(deletedData);
      console.log('Deleted data', deletedData);
      console.log('Keys of Deleted data', deletedData);
  
      admin
        .auth()
        .getUserByEmail(deletedData.email)
        .then((userRecord) => {
  
          admin
            .auth()
            .deleteUser(userRecord.uid)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully deleted user', userRecord.toJSON());
              
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
        })
        .catch((error) => {
          console.log('Error deleting user data:', error);
      });
 });


exports.deleteDoormen = functions.database.ref('/doormen/{updateID}')
 .onDelete(async (snap, context) => {

      // Grab the current value of what was written to the Realtime Database.
      const deletedData = snap.val(); // data that was created
      const token = await getToken();
      deleteExtension(deletedData.phone, token);
      const keys = Object.keys(deletedData);
      console.log('Deleted data', deletedData);
      console.log('Keys of Deleted data', deletedData);
  
      admin
        .auth()
        .getUserByEmail(deletedData.email)
        .then((userRecord) => {
  
          admin
            .auth()
            .deleteUser(userRecord.uid)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully deleted user', userRecord.toJSON());
              
            })
            .catch((error) => {
              console.log('Error deleting user:', error);
            });
        })
        .catch((error) => {
          console.log('Error deleting user data:', error);
      });
 });



/**
 * REQUEST FOR UPDATING USERS 
 */
exports.updateResident = functions.database.ref('/residents/{updateID}')
    .onWrite(async (change, context) => {

      if(change.after._data.not_completed == 0 ){
        const token = await getToken();               

        admin.auth().getUserByEmail(change.after._data.email).then(user => { 
          // User already exists
          // Only edit data when it is first created.
          
          // Grab the current value of what was written to the Realtime Database.
          console.log('Valor original', change.before._data.email);
          deleteExtension(change.before._data.phone, token);
          addExtensionQuery(change.after._data, token);
      
          admin
            .auth()
            .getUserByEmail(change.before._data.email)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              const props = Object.keys(userRecord);
              console.log('Successfully fetched user data:', userRecord.uid);
              console.log('Propiedades del objeto auth:', props);
      
              admin
                .auth()
                .updateUser(userRecord.uid, {
                  email: change.after._data.email
                })
                .then(async (userRecord) => {
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log('Successfully updated user', userRecord.toJSON());
      
                })
                .catch((error) => {
                  console.log('Error updating user:', error);
                });
            })
            .catch((error) => {
              console.log('Error fetching user data:', error);
            });

        }).catch(err => { 
          if (err.code === 'auth/user-not-found') {
            // User doesn't exist yet, create it...
            admin.auth().createUser({
                email: change.after._data.email,
                password: "."+change.after._data.phone+".",
            })
            .then(async function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
              
                //await addExtensionQuery(createdData, token);
                addExtensionQuery(change.after._data, token);

            })
            .catch(function(error) {
                console.log("Error creating new user:", error);
            });


          }
        })


      }

  
  
    });


exports.updateGuest = functions.database.ref('/guests/{updateID}')
    .onWrite(async (change, context) => {
      // Grab the current value of what was written to the Realtime Database.
      console.log('Valor original', change.before._data.email);
      const token = await getToken();
      deleteExtension(change.before._data.phone, token);
      addExtensionQuery(change.after._data, token);
  
      admin
        .auth()
        .getUserByEmail(change.before._data.email)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          const props = Object.keys(userRecord);
          console.log('Successfully fetched user data:', userRecord.uid);
          console.log('Propiedades del objeto auth:', props);
  
          admin
            .auth()
            .updateUser(userRecord.uid, {
              email: change.after._data.email
            })
            .then(async (userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully updated user', userRecord.toJSON());
              
              
  
            })
            .catch((error) => {
              console.log('Error updating user:', error);
            });
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
      });
  

  
  
    });

exports.updateAdmin = functions.database.ref('/administrators/{updateID}')
    .onWrite(async (change, context) => {


      if(change.after._data.not_completed == 0 ){
        const token = await getToken();               

        admin.auth().getUserByEmail(change.after._data.email).then(user => { 
          // User already exists
          // Only edit data when it is first created.
          
          // Grab the current value of what was written to the Realtime Database.
          console.log('Valor original', change.before._data.email);
          deleteExtension(change.before._data.phone, token);
          addAdminExtensionQuery(change.after._data, token);
      
          admin
            .auth()
            .getUserByEmail(change.before._data.email)
            .then((userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              const props = Object.keys(userRecord);
              console.log('Successfully fetched user data:', userRecord.uid);
              console.log('Propiedades del objeto auth:', props);
      
              admin
                .auth()
                .updateUser(userRecord.uid, {
                  email: change.after._data.email
                })
                .then(async (userRecord) => {
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log('Successfully updated user', userRecord.toJSON());
      
                })
                .catch((error) => {
                  console.log('Error updating user:', error);
                });
            })
            .catch((error) => {
              console.log('Error fetching user data:', error);
            });

        }).catch(err => { 
          if (err.code === 'auth/user-not-found') {
            // User doesn't exist yet, create it...
            admin.auth().createUser({
                email: change.after._data.email,
                password: "."+change.after._data.phone+".",
            })
            .then(async function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log("Successfully created new user:", userRecord.uid);
              
                //await addExtensionQuery(createdData, token);
                addAdminExtensionQuery(change.after._data, token);

            })
            .catch(function(error) {
                console.log("Error creating new user:", error);
            });


          }
        })


      }

  
  
    });
  
exports.updateDoormen = functions.database.ref('/doormen/{updateID}')
    .onWrite(async (change, context) => {

      // Only edit data when it is first created.
  
      // Grab the current value of what was written to the Realtime Database.
      console.log('Valor original', change.before._data.email);
      const token = await getToken();
      deleteExtension(change.before._data.phone, token);
      addExtensionQuery(change.after._data, token);
  
      admin
        .auth()
        .getUserByEmail(change.before._data.email)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          const props = Object.keys(userRecord);
          console.log('Successfully fetched user data:', userRecord.uid);
          console.log('Propiedades del objeto auth:', props);
  
          admin
            .auth()
            .updateUser(userRecord.uid, {
              email: change.after._data.email
            })
            .then(async (userRecord) => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully updated user', userRecord.toJSON());
              
              
  
            })
            .catch((error) => {
              console.log('Error updating user:', error);
            });
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
      });
  
  
    });

/**
 * GET TOKEN
 */

async function getToken(createdData){
    
  try{
    const reqData = "grant_type=client_credentials&scope=gql:core+gql:framework&client_id=b83bee503cd2d3027f9bc1e86e5ef16ea196af2e1be65f78130a878e2bdbbc3a&client_secret=06b801a01dca47ead7f5352164394a56";
    
    const response = await axios({
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/token',
      data: (reqData),   

      headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
      }})

      console.log("Data: "+ response.data.access_token)
      return response.data.access_token;

  }catch(error){
    console.log(error);
  }
    
}

/**
 * GQL QUERIES
 */

async function addExtensionQuery(usrData, token){

  try{

    var data = JSON.stringify({
      query: `mutation {
        addExtension(
            input: {
                extensionId: ${usrData.phone}
                name: "${usrData.numHome}"
                tech: "sip"
                email: "${usrData.email}"
                callerID: "${usrData.numHome}"
            }
        ) {
            status
            message
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/gql',
      headers: { 
        'Authorization': "Bearer " + token, 
        'Content-Type': 'application/json' 
      },
      data : data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    refreshServer();

  }catch(error){
    console.log("Error creating new user freepbx", error);
  }

}

async function addAdminExtensionQuery(usrData, token){

  try{

    var data = JSON.stringify({
      query: `mutation {
        addExtension(
            input: {
                extensionId: ${usrData.phone}
                name: "Administrador"
                tech: "sip"
                email: "${usrData.email}"
                callerID: "Administrador"
            }
        ) {
            status
            message
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/gql',
      headers: { 
        'Authorization': "Bearer " + token, 
        'Content-Type': 'application/json' 
      },
      data : data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    refreshServer();

  }catch(error){
    console.log("Error creating new user freepbx", error);
  }

}

async function addDoormenExtensionQuery(usrData, token){

  try{

    var data = JSON.stringify({
      query: `mutation {
        addExtension(
            input: {
                extensionId: ${usrData.phone}
                name: "Portería"
                tech: "sip"
                email: "${usrData.email}"
                callerID: "Portería"
            }
        ) {
            status
            message
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/gql',
      headers: { 
        'Authorization': "Bearer " + token, 
        'Content-Type': 'application/json' 
      },
      data : data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    refreshServer();

  }catch(error){
    console.log("Error creating new user freepbx", error);
  }

}



async function refreshServer(){

  const token = await getToken();
  try{
    var data = JSON.stringify({
      query: `mutation {
        doreload(input: {}) {
          message
          status
          transaction_id
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/gql',
      headers: { 
        'Authorization': "Bearer " + token, 
        'Content-Type': 'application/json' 
      },
      data : data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));

  }catch(error){
    console.log(error);
  }

}

async function deleteExtension(delExtension, token){

  try{
    var data = JSON.stringify({
      query: `mutation {
        deleteExtension( 
            input: { extensionId: ${delExtension} }
        ) {
            status
            message
        }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'http://44.238.145.161/admin/api/api/gql',
      headers: { 
        'Authorization': "Bearer " + token, 
        'Content-Type': 'application/json' 
      },
      data : data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    refreshServer();

  }catch(error){
    console.log(error);
  }

}


/*
exports.addGuestExtension = functions.https.onRequest((request, response) => {
});
*/