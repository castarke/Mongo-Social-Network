const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');
// get and post routes for thought
router.route('/').get(getThought).post(createThought);
// get, put, delete routes  for thoughts
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// post routes for reactions
router.route('/:thoughtId/reaction').post(addReaction);
// delete route for reaction
router.route('/:thoughtId/reaction/:reaactionId').delete(removeReaction);

module.exports = router;