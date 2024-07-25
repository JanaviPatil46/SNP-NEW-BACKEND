
const { mongoose} = require('mongoose');


const contactSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    contactName:{
        type:String ,
        required: [true, 'Contact name is required'],
    },
    companyName:{
        type:String 
    },
    note:{
        type:String 
    },
    ssn:{
        type:Number
    },
    email:{
        type:String,
        validate: {
            validator: (value) => /\S+@\S+\.\S+/.test(value),
            message: 'Invalid email format',
        },  
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        type: Array,
        ref: 'Tags', 
       // required: true
}],

    country: {
        type: String,
      //  required: [true, 'Country is required'],
    },
    streetAddress: {
        type: String,
        //required: [true, 'Street address is required'],
    },
    city: {
        type: String,
       // required: [true, 'City is required'],
    },
    state: {
        type: String,
       // required: [true, 'State is required'],
    },
    postalCode: {
        type: Number,
       // required: [true, 'Postal code is required'],
    },
    phoneNumbers: [
        {
                type: Array,
               
        
        }
    ],
    active: {
        type: Boolean,
        default: true,
    },

},{ timestamps: true})

// collection
const  Contacts = new mongoose.model("Contacts", contactSchema)
module.exports = Contacts;