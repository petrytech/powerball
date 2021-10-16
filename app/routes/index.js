const express = require('express')

const { root } = require('../controllers/root')
const { notFound } = require('../controllers/notfound')
const { validateReqBody, getScoreData } = require('../controllers/ticket') 
const { getLoterryResults} = require('../controllers/resultsAPI')

// Globals
const globalConst = require('../utils/globalConst')


const router = express.Router()

// Routes
router.get('/', root)
router.post('/ticket', async function (req,res) {
    
    validateReqBody(req)
    
    const loterryResults = await getLoterryResults(globalConst.DATA_GOV_URL) //TODOX rename resultsJson

    getScoreData(req.body.drawDate, req.body.lotteryNumbers, loterryResults)


})

// Fall Through Route
router.use(notFound)

module.exports = router