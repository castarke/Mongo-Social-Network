const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');
// get and post routes for users 
router.route('/').get(getUsers).post(createUser);
// get, put, delete routes for users
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// adding and deleting friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;