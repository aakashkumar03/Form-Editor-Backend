const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({

    formId: {
        type: Number,
        required: true,
        trim: true, 
    },
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    fields: {
      type: [
        {
          type:{
            type: String,
            enum: ['text', 'email', 'number', 'date', 'password'],
            required: true,
          },
          title:{
            type: String,
            required: true,
          },
          placeholder: {
            type: String,
            required: true,
          },

        }
      ], 
      required: true,
    },
}, { timestamps: true });

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
