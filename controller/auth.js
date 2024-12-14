const User = require("../models/user");

// Register function
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try{
        if(!firstName || !lastName || !email || !password) {
         return res.status(404)
            .json({success: false, message: "Please input all fields"});
        }

        // Check for user
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409)
                    .json({ success: false, message: "User already exist"})
        }

        // create User
        const user = await User.create({
            email,
            firstName,
            lastName,
            password
        });

        const token = user.getSignedJwtToken();

        return res.status(201)
        .json({ success: true, message: "user created successfully", token})
    } catch(err){
        console.error("something went wrong:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Login function

const login = async (req, res) => {
 const {email, password} = req.body

 // Validate email and password
  if(!email){
    return res 
      .status(400)
      .json({ success: false, message: "Please input an email"})
  }

  if(!password){
    return res 
      .status(400)
      .json({ success: false, message: "Please input your password "})
  }

  //Check if the user is registered in the database
  const user = await User.findOne({ email })
  if(!user) {
    return res 
      .status(401)
      .json({ success: false, message: "User does not exist"})
  }

   //check if password matches
   const isMatch = await user.matchPassword(password)
   if(!isMatch){
    return res 
       .status(422)
       .json({ success: false, message: "Invalid Password"})
   }

   const token = user.getSignedJwtToken();
   return res.status(200)
    .json({success: true, message: "Login successful", token})
}

const updateDetails = async (req, res) => {
    const fieldsToUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
   const user = await User.findByIdAndUpdate(
    req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
   });

   return res.status(200)
           .json({success: true,
             message: "User Details updated successfully", 
             user})

}

const updatePassword = async(req, res) => {
    const user = await User.findById(req.params.id).select("+password");

    //check current password
    if(!(await user.matchPassword(req.body.currentPassword))){
        return res
             .status(401)
             .json({ success: false, message: "Password is incorrect"})
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({success: true, message: "Password updated"})
}

const deleteUser = async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({success: true, message: "User deleted"})
}

// Fetch a single user
const getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    
    res.status(200).json({ success: true, message: "User details retrieved", user})
}

// fetch all users in the db
const getUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).json({success: true, message: "Users details retrieved", users})
}

module.exports = {
    register,
    login,
    updateDetails,
    deleteUser,
    getUser,
    getUsers,
    updatePassword  
}


/**
 * POST
 * PUT
 * DELETE
 * 
 * -- GET
 * 
 */