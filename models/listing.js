const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:  {
          type: String,
          default: "https://media.istockphoto.com/id/1351763219/photo/crystal-cove-state-park-sky-fire.webp?b=1&s=170667a&w=0&k=20&c=mJEFZ68eUauueOHxlGRbBQZ-F0J-FwMXLWGqs5a0LAk=",
          set: (v) => v === "" ?
          "https://media.istockphoto.com/id/1351763219/photo/crystal-cove-state-park-sky-fire.webp?b=1&s=170667a&w=0&k=20&c=mJEFZ68eUauueOHxlGRbBQZ-F0J-FwMXLWGqs5a0LAk=" 
          : v,
          required: true,
      },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);4
module.exports = Listing;



// {
//   filename: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
// },