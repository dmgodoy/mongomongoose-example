require('dotenv').config();
let mongoose = require('mongoose');
const mongoUri = process.env['MONGO_URI']
mongoose.connect(mongoUri);

const { Schema } = mongoose;

const personSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  age: Number,
  favoriteFoods:   [String],
});
const Person = mongoose.model('Person', personSchema);



const createAndSavePerson = (done) => {
  const p = new Person({name: "David", age: 34, favoriteFoods:["DoubleBigMac"]});
  p.save((err, data)=>{
    if(err)
      console.log(err);
    else
      done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName}).exec((err, people) => {
    if(err)
      console.log(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}).exec((err, person) => {
    if(err)
      console.log(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId).exec((err, person) => {
    if(err)
      console.log(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId).exec((err, person) => {
    if(err)
      console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data)=>{
      if(err)
        console.log(err);
      done(null, data);
    })
  })

};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate({name: personName}, { age: 20 }, {new : true})
    .exec((err, newPerson) => {
      if(err){ console.log(err); return;}
      done(null, newPerson);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if(err)
      console.log(err);
    else
      done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, result) => {
    if(err)
      return console.log(err);
    done(null, result);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort({name : 'asc'})
        .limit(2)
        .select("-age")
        .exec((err, people) => {
          if(err)
            return console.log(err);
          done(null, people);
        });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
