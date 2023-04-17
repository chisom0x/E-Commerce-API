// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const Item = require('./../Models/itemModel')
 const router = express.Router();


 function createSearchEndpoint(searchCollection) {
    router.post('/', (req, res) => {
      const { searchTerm } = req.body;
  
      // Insert the search term into the search collection
      searchCollection.updateOne(
        { query: searchTerm },
        { $inc: { count: 1 } },
        { upsert: true },
        (err) => {
          if (err) {
            console.error('Error updating search collection:', err);
          }
        }
      );
  
      // Search for items in the database and return the results
      Item.find({ $text: { $search: searchTerm } }, (err, items) => {
        if (err) {
          console.error('Error searching for items:', err);
          res.status(500).send('Error searching for items');
        } else {
          res.send(items);
        }
      });
    });
  
    return router;
  }
  
  module.exports = (DB) => {
    const searchCollection = mongoose.connection.collection('search');
    return createSearchEndpoint(searchCollection);
  };