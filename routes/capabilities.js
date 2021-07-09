
const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const backEndURL = process.env.BACK_END_URL;

router.get('/viewCapabilityLead/:capID', async function (req, res){
    try{
        const capID = req.params.capID;
        const response = await axios(`${backEndURL}/capabilities/viewCapabilityLead/${capID}`);
        res.render('viewCapabilityLeadResults', {capabilities: response.data, capID});
        res.status(200);

        }
        catch (error) {
        console.error(error);
        }
     })
module.exports = router;