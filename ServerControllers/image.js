const { json } = require('body-parser');
const Clarifai = require('clarifai')


//API clarifai for face detection
    //take in mind that CLARIFAI API takes too much updates times, 
    //it might fail to load the API since the API server goes down sometimes
const  app = new Clarifai.App({
    apiKey: '3f4c276e49e242648ada1321d441fd2a'
});
const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to Get API from the backend'))
    }
//image count actualization for the user
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};

