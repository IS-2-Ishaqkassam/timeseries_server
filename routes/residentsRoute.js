const express = require( 'express' )
const router = express.Router()

const residentController = require( "../controllers/residentsController.js" )

router.post( '/', residentController.createResident )

module.exports = router