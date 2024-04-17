const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key b657283032c946d2be4a1645260f778b");











// const Clarifai= require ('clarifai');
// console.log(Clarifai)



// const returnClarifaiRequestOptions= (imageUrl)=>{ // Your PAT (Personal Access Token) can be found in the portal under Authentification
//     const PAT = 'ec58ecdc23dc4d018d6f0325fba83da2';
//     // Specify the correct user_id/app_id pairings
//     // Since you're making inferences outside your app's scope
//const USER_ID = 'twzjl59lqwo1';       
//  const APP_ID = 'test';
//     // Change these to whatever model and image URL you want to use
  
//     const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
//     const IMAGE_URL = imageUrl;

//      const raw = JSON.stringify({
//         "user_app_id": {
//             "user_id": USER_ID,
//             "app_id": APP_ID
//         },
//         "inputs": [
//             {
//                 "data": {
//                     "image": {
//                         "url": IMAGE_URL
//                     }
//                 }
//             }
//         ]
//     });
        
//       const  requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     };
//        return requestOptions
//   }

  const handleApiCall = (req,res) => {

stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id:'aaa03c23b3724a16a56b629203edc62c',
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:")
        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
        res.json(response)
    }
);
}



    //   fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input)).then(response => response.json()).then(result => console.log(result)) 
    //    // Parse response data to JSON
    // .then(data => res.json(data)) 
    //   .catch(err=> res.status(400).json('unable to work with API'))

  
// const handleApiCall = (req,res) => {
// fetch("https://api.clarifai.com/v2/models/" + "6dc7e46bc9124c5c8824be4822abe105" + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
//     }






const handleImage = (req,res ,db)=>{
  const {id}=req.body;
  db('users').where('id','=',id).increment('entries',1).returning('entries').then(entries=>{
    
    res.json(entries[0].entries) 
  
  }).catch( err => res.status(400).json('user not exist'))

}

module.exports = {
  handleImage : handleImage  ,
  handleApiCall
};