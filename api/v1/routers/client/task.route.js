const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("xu ly trong controllers")
})

module.exports = router