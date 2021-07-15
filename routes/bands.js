const express = require('express');

const router = express.Router();
const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

router.get('/addBand', async (req, res) => {
  try {
    // const { roleID } = req.params;
    // const response = await axios(`${backEndURL}/jobs/job-roles-spec/${roleID}`);
    res.render('pages/addBand', {
      bands: ['Principal', 'Associate'],
      competencies: ['Expert', 'Advanced', 'Proficient', 'Emerging', 'Effective'],
      training: ['TrainingA', 'TrainingB', 'TrainingC'],
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

router.post('/addBand', async (req, res) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${backEndURL}/bands/addBand`,
      data: {
        name: req.body.bandName,
        aboveOrBelow: req.body.bandPlace,
        refBand: req.body.bands,
        training: req.body.training,
        competencies: req.body.competencies,
        responsiblities: req.body.responsiblities,
      },
    });
    console.log(response.data);
    res.render('pages/addBand', {
      bands: ['Principal', 'Associate'],
      competencies: ['Expert', 'Advanced', 'Proficient', 'Emerging', 'Effective'],
      training: ['TrainingA', 'TrainingB', 'TrainingC'],
    });
    res.status(200);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
