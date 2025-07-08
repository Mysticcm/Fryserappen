const mongoose = require('mongoose');

const vareSchema = new mongoose.Schema({
  name: String, 
  type: String,
  weight: Number,
  date: String,
  fridgeNumber: Number,
  comment: String
})  
const Varer = mongoose.model('Vare', vareSchema);

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
        Varer.insertOne(ny)
        return;
    }

    // Find wares
    async findAll() {
        const varer = await Varer.find({}).limit(20).exec();
        return varer;
    }
    // Find by name
    async findByName(name) {
        const varer = await Varer.find({name: name}).exec();
        return varer;
    }
    // Find by type
    async findByType(type) {
        const varer = await Varer.find({type: type}).exec();
        return varer;
    }
    // Find by Date
    async findByDate(date) {
        const varer = await Varer.find({date: {$gt : date}})
        return varer;
    }
    // Find by fridgeNumber
    async findByFridge(fridgeNumber) {
        const varer = await Varer.find({fridgeNumber: fridgeNumber})
        return varer;
    }    
    // Sorty by name
    async sortByName(name) {
        const varer = await Varer.find({}).sort({name: name});
        return varer;
    }
    // Find the different values of a key
    async different(key) {
        const distinct = await Varer.distinct(key);
        return distinct;
    }
}

module.exports = VareService;