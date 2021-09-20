const router = require('express').Router();

const authMiddleware = require('../middleware/auth');


const { createUser, getUsers, getUserById, updateUser, deleteUser, login, profile, logout, logoutAll } = require('../controller/user');



router.post('/', createUser);

router.get('/me', authMiddleware, profile);

router.post('/logout',authMiddleware, logout);

router.post('/logoutAll', authMiddleware, logoutAll);

router.get('/',authMiddleware, getUsers);

router.get('/login', login);

router.get('/:id', authMiddleware, getUserById);

router.patch('/:id', authMiddleware,  updateUser);

router.delete( '/:id',authMiddleware, deleteUser);




module.exports = router;