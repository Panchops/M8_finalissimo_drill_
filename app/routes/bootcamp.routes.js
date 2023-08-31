const express = require('express');
const router = express.Router();
const {
  createBootcamp,
  addUserToBootcamp,
  findBootcampById,
  findAllBootcamps,
  updateBootcampById,
  deleteBootcampById,
} = require('../controllers/bootcamp.controller');
const { verifyToken } = require('../middleware');


router.get('/', findAllBootcamps);


router.use('/', verifyToken);

router.post('/', createBootcamp);


router.post('/adduser', addUserToBootcamp);


router.get('/:id', findBootcampById);


router.put('/:id', updateBootcampById);

router.delete('/:id', deleteBootcampById);

module.exports = router;
