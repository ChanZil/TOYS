const Joi = require("joi");
const { Toy } = require("../models/toy.model");


const toyJoiScheme = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    info: Joi.string().min(2).max(200).required(),
    category: Joi.string().min(1).max(50).required(),
    img_url: Joi.string().max(300),
    price: Joi.number().required(),
    date_created: Joi.date(),
    userId: Joi.string()
});


//get all the toys, 10 per page
exports.getToys = async (req, res, next) => {
    try {
        const queryPage = req.query.page || 1;
        const perPage = 10;
        const toys = await Toy.find({})
            .skip((queryPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json(toys);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
};


//search toy by name or by info
exports.getToysByNameInfo = async (req, res, next) => {
    try {
        const queryS = req.query.s;
        const queryPage = req.query.page || 1;
        const perPage = 10;
        const toys = await Toy.find({
            $or: [
                { name: queryS },
                { info: queryS }
            ]
        })
            .skip((queryPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json(toys);

    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}

//get toys by category
exports.getToysByCategory = async (req, res, next) => {
    try {
        const catName = req.params.catname;
        const queryPage = req.query.page || 1;
        const perPage = 2;
        const toys = await Toy.find({ category: catName })
            .skip((queryPage - 1) * perPage)
            .limit(perPage);;
        res.status(200).json(toys);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}

//get a toy by id
exports.getToyById = async (req, res, next) => {
    try {
        const toyId = req.params.id;
        const toy = await Toy.findById({ _id: toyId });
        res.status(200).json(toy);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}

//add a new toy
exports.addToy = async (req, res, next) => {
    try {
        const ownerId = res.locals.userId;
        let newToy = req.body;
        newToy["userId"] = ownerId;
        const validateToy = toyJoiScheme.validate(newToy);
        if (validateToy.error) {
            throw Error(validateToy.error);
        }
        newToy = new Toy(newToy);
        await newToy.save();
        res.status(201).send(newToy);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}

//edit toy
exports.editToy = async (req, res, next) => {
    try {
        const ownerId = res.locals.userId;
        let toy = await Toy.findOne({ _id: req.params.editId });

        //check if userId of toy to edit mached to current user
        if (toy.userId != ownerId) {
            throw Error("Toy is not related to user");
        }

        //validate edited toy
        const validateToy = toyJoiScheme.validate(req.body);
        if (validateToy.error) {
            throw Error(validateToy.error);
        }

        //save updated toy in database
        let updatedToy = await Toy.updateOne(toy, req.body);
        res.status(201).send(updatedToy);

    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}

//delete toy
exports.deleteToy = async (req, res, next) => {
    try {
        const ownerId = res.locals.userId;
        let toy = await Toy.findOne({ _id: req.params.delId });

        //check if userId of toy to edit mached to current user
        if (toy.userId != ownerId) {
            throw Error("Toy is not related to user");
        }

        //delete toy
        let deletedToy = await Toy.deleteOne(toy._id);
        res.status(201).send(deletedToy);

    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ msg: err.message });
    }
}