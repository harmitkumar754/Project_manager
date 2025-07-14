const User = require("../model/usermodel");
const bcrypt = require('bcryptjs');
const GenerateToken = require("../utils/GenerateToken");
const formatDateToDDMMYYYY = require("../utils/formatDateToDDMMYYYY");
const userValidationSchema = require('../validations/userValidation'); 
const loginValidationSchema = require('../validations/loginValidation');
const Project = require('../model/projectmodel');



module.exports.registercontroller = async (req, res) => {
  try {

    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, Designation, phone, password,jdt } = req.body;


    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const countdoc = await User.countDocuments();
    const newid = countdoc + 1 || 1;
   const formatedate = formatDateToDDMMYYYY(jdt)
  
    const newUser = new User({ uid: newid,name, Designation, phone, password: hashedPassword ,jdt: formatedate});
    
    await newUser.save();


    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error in registercontroller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.logincontroller = async (req, res) => {
  try {
    
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = GenerateToken(user.phone);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("Error in logincontroller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.allusers =async (req,res)=>{
   try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in allusers controller:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }

}

module.exports.logout = async (req, res) => {
    try {
        // console.log(req.body)
        
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.fetchProfile = async (req, res) => {
  try {
    const phone = req.phone;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "fetch successfully", user });

  } catch (error) {
    console.error("Error in fetchProfile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.profileedit = async (req, res) => {
  try {
    const phoneFromToken = req.phone; 
    
    
           const { name, phone } = req.body;  

    const user = await User.findOne({ phone: phoneFromToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
     user.phone = phone || user.phone; 

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error in profileedit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};






module.exports.getUserProjects = async (req, res) => {
  try {
    const phone = req.phone;
    const user = await User.findOne({ phone });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const projectPids = user.projectid.map(p => p.pid);

    
    const allProjects = await Project.find({ pid: { $in: projectPids } });

    const projects = user.projectid.map(p => {
      const fullProject = allProjects.find(proj => proj.pid === p.pid);
      return {
        pid: p.pid,
        title: fullProject?.title ,
        status: p.status,
        description: fullProject?.description ,
        deadline: fullProject?.deadline 
      };
    });

    res.status(200).json({ projects });

  } catch (error) {
    console.error('Error in getUserProjects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports.updateProjectStatus = async (req, res) => {
  try {
    const phone = req.phone;
    const { pid, status } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const projectEntry = user.projectid.find(p => p.pid === pid);
    if (!projectEntry) return res.status(404).json({ message: 'Project not assigned' });

    projectEntry.status = status;
    await user.save();

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error in updateProjectStatus:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
