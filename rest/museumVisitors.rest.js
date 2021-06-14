const router = require('express').Router()
const request = require("request")
const museumVisitorsService = require("../services/MuseumVisitors.js")

/**
 * @API /api/visitors?date=<date in milliseconds>&ignored=<museum to be ignored>
 * @optional ignored param is optional
 * @returns the response with highest and lowest museums and visitor count
 */
router.get("/api/visitors", async (req, res) => {
    const options = {
        url: "https://data.lacity.org/resource/trxm-jn3c.json"
    }
    let queryOptions = req.query
    // Requesting data from LA city API
    request(options, async (err, response, body) => {
        if (err)
            return res.status(500).json({
                "Error": err
            })
        let finalRes = await museumVisitorsService.getVisitorData(queryOptions, body)
        return res.json(finalRes)
    })
})

module.exports = router