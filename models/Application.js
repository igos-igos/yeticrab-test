const {Schema, model} = require("mongoose")

const schema = new Schema({
  appNumber: {type: Number, required: true, unique: true},
  date: {type: Date, default: Date.now, required: true},
  clientOrganizationName: {type: String, required: true},
  carrierName: {type: String, required: true},
  carrirerPhone: {type: Number, required: true},
  ati: {type: String, required: true},
  comment: {type: String, required: false}
})

module.exports = model("Application", schema)
