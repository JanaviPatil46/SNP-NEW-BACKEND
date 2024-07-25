const mongoose = require('mongoose');
const Tags = require('../models/tagsModel');


// get all tags
const getAllTags = async (req,res)=>{
    // const tags = await Tags.find({}).sort({createdAt: -1})
    // res.status(200).json(tags)
    try {
        const tags = await Tags.find({}).sort({createdAt: -1})
    res.status(200).json({ message: "Tags retrieved successfully", tags })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get single tag
const getSingleTag = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such a tag'})
    }

    // const tags = await Tags.findById(id)
    // if(!tags){
    //         return res.status(200).json({error:'No such a tag'})
    // }
    // res.status(200).json(tags)
    try {
        const tag = await Tags.findById(id);

        if (!tag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag retrieved successfully", tag });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



//create new contact
const createTag = async (req, res) => {
    const { tagName,tagColour} = req.body
    try {
         const existingTag = await Tags.findOne({ tagName });

 if (existingTag) {
            return res.status(200).json({message: "Tag with this TagName already exists" });
        }

        const newTag = await Tags.create({ tagName,tagColour })
        res.status(200).json({ message: "Tag created successfully", tags: newTag });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delte tags
const deleteTags = async(req, res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Tag ID" });
    }

    try {
        const deletedTag = await Tags.findByIdAndDelete({ _id: id });

        if (!deletedTag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// update tags
const updateTags = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Tag ID" });
    }

    try {
        const updatedTag = await Tags.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedTag) {
            return res.status(404).json({ error: "No such Tag" });
        }

        res.status(200).json({ message: "Tag updated successfully", tag: updatedTag });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTags,
    getSingleTag,
    createTag,
    deleteTags,
    updateTags
}