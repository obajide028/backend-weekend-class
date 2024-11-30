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

        return res.status(201)
        .json({ success: true, message: "user created successfully", user})
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

   return res.status(200)
    .json({success: true, message: "Login successful", user})
}

module.exports = {
    register,
    login
}