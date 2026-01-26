const Vare = require("../models/Vare");

// Create ny ware ++
    async function createWare(nyVare) {
        return await Vare.create(nyVare);
    }

// Edit ware
    async function editWare(vare) {
        return await Vare.findByIdAndUpdate({_id: vare.id}, {$set: vare}).exec();
    }

// Delete ware
    async function deleteWare(id) {
        let idExists = await Vare.findById( id );
        if(idExists) {
            await Vare.deleteOne({_id: id}).exec();
        }
        return;
    }

// Find all wares
    async function findAll() {
        return await Vare.find({}).limit(50).exec();
    }

// Find by Date
    async function findByDate(date) {
        return await Vare.find({date: date}).sort({ date: 1 }).exec();
        
    }

// Find by fridgeNumber
    async function findByFridge(fridgeNumber) {
        try {
            const varer = await Vare.find({ fridgeNumber }).exec();
            const count = await Vare.countDocuments({ fridgeNumber }).exec();
            return { fridgeNumber, varer, count };
        } catch (err) {
            console.error('Error finding items:', err);
            throw new Error('Failed to fetch fridge data');
        }
    }    

// Sort
    async function sortBy(key, value) {
        return await Vare.find({}).sort({ [key]: value} ); 
    };

// Find the different values of a key
    async function different(key) {
        return await Vare.distinct(key).sort();
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