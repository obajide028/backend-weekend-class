const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please add your firstname'],
            maxlength: [50, 'Name must not be more than 50 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Please add your lastname'],
            maxlength: [50, 'Name must not be more than 50 characters']
        },
        email: {
            type: String,
            required: [true, "please provide an email"],
            unique: [true, "User already exist"],
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 
                      'Please add a valid email']
        },
        password: {
            type: String,
            required: [true, 'please add a password'],
            minlenght: [8, " Password must be more than 8 characters"]
        },
    }
)


// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    const salt  = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

/**
 * Function to compare hashed password on the db 
 *  and the entered password by the user
 *  */ 
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User", UserSchema);


