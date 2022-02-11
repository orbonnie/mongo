const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://localhost/mongoose_tests', () => {
  console.log(`connected`);
},
  err => console.log(err.message)
);

run();
async function run() {
  try {
    // traditional way to create new
    // const user = new User({ name: 'Kyle', age: 26 });
    // await user.save();

    //RECOMMENDED METHOD FOR UPDATE TO ENSURE VALIDATION
    //User.find().save();
    //const user = await User.findOne({ name: /kyle/i });
    // const user = await User.where('name').equals(/kyle/i);

    //ADDING A BESTFRIEND
    // const user = await User.where('age')
    //   .gt(21)
    //   .where('name').equals(/kyle/i)
    //   .limit(1)
    //   .populate('bestfriend')
    // // .select('bestfriend');
    // user[0].bestfriend = await User.create({
    //   name: 'Fred',
    //   age: 30,
    //   email: 'fred@gmail.com',
    //   hobbies: ['Hiking', 'fishing'],
    //   address: {
    //     street: 'Pine Drive'
    //   }
    // });
    // await user[0].save();

    // const user = await User.findOne({ name: 'Fred' });
    // console.log(user.namedEmail);

    const user2 = await User.findOne({ name: 'Kyle', email: 'kyle@gmail.com' });
    console.log(user2);
    await user2.save();
    console.log(user2);


    //EFFICIENT WAY TO CREATE DOCUMENT
    //   const user = await User.create({
    //     name: 'Kyle',
    //     age: 26,
    //     email: 'KYLE@gmail.com',
    //     hobbies: ['Weight lifting', 'bowling'],
    //     address: {
    //       street: 'Main Street'
    //     }
    //   });

    //   console.log(user);
    //   //CHANGE A PROPERTY
    //   // user.name = 'Sally';
    //   // await user.save();

  } catch (e) {
    console.log(e.message);
  }
}

