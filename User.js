const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    //can validate info with validator cb, only runs on create or save methods
    //will not check on update
    validate: {
      validator: v => !(v % 2),
      message: props => `${props.value} is not an even number`
    }
  },
  email: {
    type: String,
    minLength: 10,
    lowercase: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  //tells schema that this property is a reference to another user Id
  bestfriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  hobbies: [String],
  //can assign a schema for nested objects
  address: addressSchema
});


//CANNOT USE ARROW FUNCTIONS IN THESE DEFINITIONS

userSchema.methods.sayHi = function () {
  console.log((`Hi, my name is ${this.name}`));
};

userSchema.statics.findByName = function (name) {
  return this.find({ name: RegExp(name, 'i') });
};

userSchema.query.byName = function (name) {
  return this.where({ name: RegExp(name, 'i') });
};

//can be .get or .set
//creates info you can use but doesn't store on the model
userSchema.virtual('namedEmail').get(function () {
  return `${this.name} ${this.email}`;
});

//middleware
//can be pre or post depending on if we want it to happen befor or after action
//actions can be 'save', 'remove', 'validate'
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  //must include next or code will get stuck on this line
  next();
  //INSTEAD OF next() YOU CAN THROW AN ERROR TO STOP ACTION
  // throw new Error('Save Failed');
});

//doc is the document that is being changed-use instead of 'this'
userSchema.post('save', function (doc, next) {
  doc.sayHi();
  //must include next or code will get stuck on this line
  next();
});


module.exports = mongoose.model('User', userSchema);