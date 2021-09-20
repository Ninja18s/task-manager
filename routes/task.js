const router = require('express').Router();


const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, userTasks } = require('../controller/task');

const authMiddleware = require('../middleware/auth');




router.post('/',authMiddleware , createTask );

router.get('/allTasks', authMiddleware , getAllTasks);

router.get('/', authMiddleware, userTasks);

router.get('/:id', authMiddleware , getTaskById);

router.patch('/:id', authMiddleware ,  updateTask);

router.delete( '/:id', authMiddleware , deleteTask);




module.exports = router;