const express = require('express');
const { registercontroller,logincontroller,logout,fetchProfile,profileedit,allusers,getUserProjects ,updateProjectStatus} = require('../controller/usercontroller');
const router =express.Router();
const authmiddleware = require('../middleware/authmiddleware');

router.get('/',(req,res)=>{
    res.send('User Router is working');
});


router.post('/register',registercontroller);
router.post('/login', logincontroller);
router.get('/logout',logout);
router.get('/allusers',allusers)


router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }
  return res.status(200).json({ message: "Logged in" });
});


router.get('/profile', authmiddleware,fetchProfile);
router.post('/profileedit', authmiddleware,profileedit);

router.get('/my-projects', authmiddleware, getUserProjects);
router.put('/update-status', authmiddleware, updateProjectStatus);


module.exports = router;