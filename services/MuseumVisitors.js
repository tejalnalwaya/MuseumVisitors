const _ = require("lodash")
const moment = require("moment")
const {
    getVisitorDataJoiSchema
  } = require('../lib/joiSchemas')
  const {
    joiValidatorHandler
  } = require('../utils/utils')


/**
 * This is to constructing the required response
 * @params query parameters that user pass, and the data that we got from the LA city endpoint
 * @returns required response as below 
 * {
        "attendance": {
        “month”: string,
        “year”: number,
        “highest”: {
        “museum”: string,
        “visitors”: number
        },
        “lowest”: {
        “museum”: string,
        “visitors”: number},
        “ignored”: {
        “museum”: string,
        “visitors”: number
        },
        “total”: number
        }
    }
 */

module.exports.getVisitorData = async (queryParams, data) => {

    queryParams = joiValidatorHandler(getVisitorDataJoiSchema, queryParams)
    if(typeof(queryParams) === 'string') {
        return queryParams
    }

    const currentEpoch = Math.floor(new Date()/1000) * 1000
    const date = moment(queryParams.date, "x").format("YYYY-MMM-DD")
    const ignoredMuseum = queryParams.ignore || ""
    const savedByMonth = {}
    const docs = JSON.parse(data)

    docs.map((doc) => {
        let enteredDate = doc.month.split("T")[0]
        enteredDate = moment(enteredDate).format("YYYY-MMM-DD")
        delete doc.month
        savedByMonth[enteredDate] = doc
    })
    const doc = savedByMonth[date]
    const year = parseInt(date.split('-')[0])
    const month = date.split('-')[1]
    let sortedObj = _.mapValues(_.invert(_.invert(doc)), parseInt)

    let total = sumValues(doc)
    let highest, lowest
    // If the ignored museum is lowest
    const museums = Object.keys(sortedObj)
    if (museums[0] === ignoredMuseum) {
        lowest = {
            museum: Object.keys(sortedObj)[1],
            visitors: sortedObj[museums[1]]
        }
    } else {
        lowest = {
            museum: Object.keys(sortedObj)[0],
            visitors: sortedObj[museums[0]]
        }
    }
    // If the ignored museum is the highest
    if (museums[museums.length - 1] === ignoredMuseum) {
        const _highest = Object.keys(sortedObj)[Object.keys(sortedObj).length - 2]
        highest = {
            museum: _highest,
            visitors: sortedObj[museums[museums.length - 2]]
        }
    } else {
        const _highest = Object.keys(sortedObj)[Object.keys(sortedObj).length - 1]
        highest = {
            museum: _highest,
            visitors: sortedObj[museums[museums.length - 1]]
        }
    }
    const res = _.assign({}, {
        attendance : {
            month,
            year,
            highest,
            lowest
        }
    })

    // If ignored museum is present
    if (!_.isEmpty(ignoredMuseum)) {
        res.attendance.ignored = {
            museum: ignoredMuseum,
            visitors: parseInt(doc[ignoredMuseum])
        }
        res.attendance.total = total - parseInt(doc[ignoredMuseum])
    } else {
        res.attendance.total = total
    }
    return res
}

/**
 * @returns The below function returns the sum of retrieved museum object values
 */
 const sumValues = (obj) => {
    let sum = 0
    for (let element in obj) {
        if (obj.hasOwnProperty(element))
            sum += parseInt(obj[element])
    }
    return sum
}