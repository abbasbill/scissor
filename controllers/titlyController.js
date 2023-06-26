const { urlModel } = require('../models')
var validUrl = require('valid-url');
const shortid = require('shortid');
// In-memory storage for long and short URLs

exports.titlyController = {
    

    // Route for redirecting short URLs
    getShortUrlById: async (req, res) => {
        
        const short = `http://localhost:4000/${req.params.id}`;
        try {
            // Find the corresponding URL document in the database
            const url = await urlModel.findOne({url: short.shortenedUrl});
            // If short URL doesn't exist, return 404 error
            if(!url) {
                return res.status(404).send("Url not found");
            }
            if (url) {
                console.log(url.originalUrl)
                // Redirect to the original URL
                // return res.redirect(url.originalUrl);
                return res.redirect(url.originalUrl);
            }
        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}