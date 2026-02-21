const Vare = require("../models/Vare");

// Create ny ware ++
    async function createWare(userId, nyVare) {
        const newWare = new Vare({
            ...nyVare, 
            user: userId
        });
        await newWare.save();
        return newWare;
        // return await Vare.create(nyVare);
    }

// Edit ware
    async function editWare(vare) {
        return await Vare.findByIdAndUpdate({_id: vare.id}, {$set: vare}).exec();
    }

// Delete ware
    async function deleteWare(userId, id) {
        return await Vare.findOneAndDelete({ user: userId, _id: id });
    }

// Find all wares
    async function findAll(userId) {
        return await Vare.find({user: userId}).limit(50).exec();
    }

// Find by Date
    async function findByDate(userId, date) {
        return await Vare.find({date: date, user: userId}).sort({ date: 1 }).exec();
    }

// Find by fridgeNumber
    async function findByFridge(userId, fridgeNumber) {
        try {
            const varer = await Vare.find({ user: userId, fridgeNumber }).exec();
            const count = await Vare.countDocuments({ user: userId, fridgeNumber }).exec();
            return { fridgeNumber, varer, count };
        } catch (err) {
            console.error('Error finding items:', err);
            throw new Error('Failed to fetch fridge data');
        }
    }    

// Sort
    async function sortBy(userId, key, value) {
        return await Vare.find({user: userId}).sort({ [key]: value} ); 
    };

// Find the different values of a key
    async function different(userId, key) {
        return await Vare.distinct(key, {user: userId}).sort();
    }


module.exports = {
    createWare, 
    editWare,
    deleteWare,
    findAll,
    findByDate,
    findByFridge,
    sortBy,
    different
};