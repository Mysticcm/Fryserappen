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

    // Create ny ware
    async createWare(ny) {
        const nyVare = new VareService(ny);
        console.log("Ny vare: ", nyVare);
        Varer.insertOne(ny)
    }
    // Find wares
    async findAll() {
        const varer = await Varer.find({}).exec();
        return varer;
    }
}

module.exports = VareService;