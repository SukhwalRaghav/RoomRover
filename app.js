const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// const { log } = require("console");

const MONGO_URL = "mongodb://127.0.0.1:27017/RoomRover";

main().then( () => {
    console.log("Connect to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

// const initDB = async () =>{
//     await Listing.deleteMany({});
//     await Listing.insertMany({});
//     console.log("Data Was Initialized");
// }

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine( "ejs", ejsMate );
app.use(express.static(path.join(__dirname, "/public")));

app.get("/",(req,res) => {
    res.send("Hii, I am your website");
});

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async(req,res) => {
    // let listing = req.body.listing;
    const newListing =  Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
    // console.log(listing);
});

//Edit Route
app.get("/listings/:id/edit", async(req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing } );
});

//Update Route
app.put("/listings/:id",async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req,res) => {
    let { id } = req.params;
    let deleteListing = Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})


// app.get("/tesingListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My new Hotel",
//         description: "By the Mountains",
//         price: 5000,
//         location: "Jaipur",
//         country: "India"
//     });
 
//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("Sucessfull Testing");
// });

app.listen(8080, () => {
    console.log("Server is Listening to port 8080");
});

