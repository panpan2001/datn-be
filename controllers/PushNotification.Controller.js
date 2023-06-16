const SERVER_KEY = process.env.SERVER_KEY
const FCM = require('fcm-node')
const { messaging } = require('firebase-admin')
// console.log(SERVER_KEY)
var admin = require("firebase-admin");

var serviceAccount = require("../my-first-project-23-11-2021-firebase-adminsdk-nbr8x-1b8b441884.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
});
exports.pushNotification = async (req, res, next) => {
  //send dât from push request fe and send to firebase 
try {
        let fcm= new FCM(SERVER_KEY)
        let message={
            to: "/topics/"+req.body.account_id,
            notification: {
                title: req.body.title,
                body: req.body.body,
                sound:"default",
                "click_action":"FCM_PLUGIN_ACTIVITY",
                "icon":"fcm_push_icon"
            },
            // data:{
             
            //         score: '850',
            //         time: '2:45'
                
                 
            // },
            token: SERVER_KEY
        }
        fcm.send(message, (err, response) => {
            if (err) {
                console.log("Something has gone wrong!", err)
            } else {
                console.log("Successfully sent with response: ", response)
                res.json(response)
            }
        })
        console.log(message.to)
    } catch (error) {
        console.log(error)
        next(error)

    }

   
   
}

exports.getPushNotification = async (req, res, next) => {
    // const messaging= getMessaging(firebaseApp)
    // onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    //   });
}

     //   let message={
    //         to: "http://localhost:3000/profile/"+req.body.account_id,
    //         notification: {
    //             title: req.body.title,
    //             body: req.body.body,
    //             sound:"default",
    //             "click_action":"FCM_PLUGIN_ACTIVITY",
    //             "icon":"fcm_push_icon"
    //         },
    //         data:req.body
    //     }
    //     console.log({message})
    // admin.messaging().send(SERVER_KEY, message)
    //     .then(response => {
    //         console.log(response)
    //         res.json(response)
    //     })
    //     .catch(error => {
    //         console.log(message,error.message)
    //         next(error)
    //     })