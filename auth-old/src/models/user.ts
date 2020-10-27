import mongoose from 'mongoose';
import {Password} from '../services/password';
// An interface that describes the properties
//that are required to create a new User
interface UserAttrs{
    email: string;
    password: string;
}

// An interface that describes the properties
//that a User Model has
//tell TS that there will be a build function on the User
//describes what the entire collection looks like
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc;
}


//an interface that describes the properties
//that a User Document has(single user)
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;

}

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
}, {
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
});


//everytime we save to db, execute this beforehand
userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});


//will call this instead of new User({email:x, password:x})
//for type checking
//in this way TS is aware of the set of arguments required to create a new user
userSchema.statics.build = (attrs: UserAttrs) =>{
  return new User(attrs);
};

//create user model
//can think of UserDoc and UerModel as types provided to the model constr.
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
