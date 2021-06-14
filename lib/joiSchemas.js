'use strict'
const joi = require('joi')

const getVisitorDataJoiSchema = joi.object().keys({
    date: joi.number().required()
      .error(new Error('date is required.')),
    ignore: joi.string()
      .error(new Error('ignore must be string.'))
  })

  module.exports = {
    getVisitorDataJoiSchema
  }