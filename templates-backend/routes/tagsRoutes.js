const express = require ('express');
const router = express.Router();
const {getAllTags,getSingleTag,createTag,deleteTags,updateTags} = require('../controller/tagController')

// gets all tags
router.get('/', getAllTags)

// get single tag
router.get('/:id', getSingleTag)

// post new tag
router.post('/', createTag)

// delete tag
router.delete('/:id', deleteTags)

// update tag
router.patch('/:id', updateTags)

module.exports = router