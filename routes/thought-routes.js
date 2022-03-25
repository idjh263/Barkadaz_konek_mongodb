const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../controllers/thought-controller');

// /api/thought/<userId>
router
  .route('/')
  .get(getAllThought);

// /api/thoughts/<userId>/<thoughId>
router
  .route('/:userId')
  .post(addThought);

  router
  .route('/:thoughtId')
  .get(getThoughtById)
  .post(addThought)
  .delete(removeThought);

  router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

// /api/comments/<pizzaId>/<commentId>/<replyId>


module.exports = router;
