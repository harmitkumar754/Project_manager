const User = require("../model/usermodel");
const Project = require('../model/projectmodel');

const loginValidationSchema = require('../validations/loginValidation');
const projectValidationSchema = require('../validations/projectValidation');
const formatDateToDDMMYYYY = require("../utils/formatDateToDDMMYYYY");



module.exports.useredit = async (req, res) => {

  try {
    const uid = parseInt(req.params.uid); 
    const { name, phone, Designation, jdt } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { uid: uid },
      { name, phone, Designation, jdt },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }

};

module.exports.deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const deletedUser = await User.findOneAndDelete({ uid });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.createProject = async (req, res) => {
  try {
    const { error } = projectValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, deadline, status } = req.body;
    formateddeadline=formatDateToDDMMYYYY(deadline);

     const countdoc = await Project.countDocuments();
        const newid = countdoc + 1 || 1;

    const newProject = new Project({
      pid:newid,
      title,
      description,
      deadline:formateddeadline,
      status,
    });

    await newProject.save();

    return res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error in createProject:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ pid: -1 });
    return res.status(200).json({ projects });
  } catch (err) {
    console.error('Error in allProjects:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.updateProject = async (req, res) => {
  try {

    const { pid } = req.params;
    
    console.log(req.body)

    const updated = await Project.findOneAndUpdate({ pid }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });

    return res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    console.error('Error in updateProject:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await Project.findOneAndDelete({ pid });
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error in deleteProject:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.assignProjectToUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { pid } = req.body;

    if (!pid) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyAssigned = user.projectid.some(proj => proj.pid === pid);
    if (alreadyAssigned) {
      return res.status(400).json({ message: 'Project already assigned to this user' });
    }

  
    user.projectid.push({ pid, status: 'Not Started' });

    await user.save();
    return res.status(200).json({ message: 'Project assigned successfully' });

  } catch (error) {
    console.error('Error assigning project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.unassignProjectFromUser = async (req, res) => {
  try {
    const uid = parseInt(req.params.uid);
    const { pid } = req.body;

    if (!pid) {
      return res.status(400).json({ message: "Project ID (pid) is required" });
    }
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.projectid = user.projectid.filter(p => p.pid !== pid);

    await user.save();

    return res.status(200).json({ message: "Project unassigned successfully" });
  } catch (error) {
    console.error("Error in unassignProjectFromUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};