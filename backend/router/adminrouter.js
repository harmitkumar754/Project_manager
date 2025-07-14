const express = require('express');
const { useredit,deleteUser,createProject, allProjects, updateProject, deleteProject ,assignProjectToUser, unassignProjectFromUser} = require('../controller/admincontroller');
const router =express.Router();

router.put('/useredit/:uid',useredit);
router.delete('/delete-user/:uid', deleteUser);
router.post('/create-project',createProject);
router.get('/all-projects',allProjects)
router.put('/update-project/:pid',updateProject)
router.delete('/delete-project/:pid',deleteProject)
router.put('/assign-project/:uid', assignProjectToUser);
router.put('/unassign-project/:uid', unassignProjectFromUser);





module.exports = router;