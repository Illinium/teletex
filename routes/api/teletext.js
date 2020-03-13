const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const js2xmlparser = require("js2xmlparser");

const Data = require('../../models/Data');

// @route    Post /teletext
// @desc     Update teletext
// @access   Private
router.post('/', [
  check('data', 'Data is required').not().isEmpty()
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { data } = req.body;
  try {
    const newData = new Data({data: data});
    await newData.save();
    res.send('Changes saved');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
  }
);

// @route    Get /teletext
// @desc     Test get teletext to Efir
// @access   Free
router.get('/', async (req, res) => {
  try {
     const obj = await Data.findOne();
     const xmlData = await js2xmlparser.parse("Teletext", obj.data);
     res.send(xmlData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;