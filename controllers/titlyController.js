const { urlModel } = require('../models')
const cache = require("../config/redis")

// In-memory storage for long and short URLs

exports.titlyController = {
    // Route for redirecting short URLs
    getOriginalUrl: async (req, res) => {
        const short = `https://titly.onrender.com/${req.params.id}`;
        console.log(req.params.id)
        try {
            // Find the corresponding URL document in the database
            const url = await urlModel.findOneAndUpdate({shortenedUrl:short},
                { $push: { clicks: { timestamp: Date.now() } } }
                 );
            

            // If short URL doesn't exist, return 404 error
            console.log(url)
            if(!url) {
                return res.status(404).send("Url not found");
            }
            if (url) {
                const results = req.params.id
                await cache.set(results, JSON.stringify(url.originalUrl), {
                    EX: 380,
                    NX: true,
                  });
             }

            //  Redirect to the original URL                
            return res.redirect(url.originalUrl);

        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}