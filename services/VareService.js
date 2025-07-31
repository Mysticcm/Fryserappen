const mongoose = require('mongoose');

const vareSchema = new mongoose.Schema({
  name: String, 
  type: String,
  weight: Number,
  date: String,
  fridgeNumber: Number,
  comment: String
})  
const db = mongoose.model('Vare', vareSchema);

class VareService {
    constructor(nyVare) {
        this.name = nyVare.name;
        this.type = nyVare.type;
        this.weight = nyVare.weight;
        this.date = nyVare.date;
        this.fridgeNumber = nyVare.fridgeNumber;
        this.comment = nyVare.comment;
    }

// Create ny ware ++
    async createWare(ny) {
        const nyVare = new VareService(ny);
        console.log("Ny vare: ", nyVare);
        db.insertOne(ny)
        return;
    }

// Find wares
    async findAll() {
        const varer = await db.find({}).limit(50).exec();
        return varer;
    }
/* // Find by name
    async findByName(name) {
        const varer = await db.find({name: name}).exec();
        return varer;
    }
// Find by type
    async findByType(type) {
        const varer = await db.find({type: type}).exec();
        return varer;
    } */
// Find by Date
    async findByDate(date) {
        const varer = await db.find({date: date}).sort({ date: 1 }).exec();
        return varer;
    }
// Find by fridgeNumber
    async findByFridge(fridgeNumber) {
        try {
            const varer = await db.find({ fridgeNumber }).exec();
            const count = await db.countDocuments({ fridgeNumber }).exec();
            return { fridgeNumber, varer, count };
        } catch (err) {
            console.error('Error finding items:', err);
            throw new Error('Failed to fetch fridge data');
        }
    }    

// Sort
    async sortBy(key, value) {
        const varer = await db.find({}).sort({ [key]: value} );
        return varer;
    };
// Find the different values of a key
    async different(key) {
        const distinct = await db.distinct(key).sort();
        return distinct;
    }
}

module.exports = VareService;