const { urlModel } = require('../models')
var validUrl = require('valid-url');
const shortid = require('shortid');

// In-memory storage for long and short URLs

exports.urlController = {
    getShortUrl: async (req, res) => {
        try {
            // Find the corresponding URL document in the database
            const urls = await urlModel.find({ user: req.user._id});
            if (urls) {
                res.locals.urls = urls;
                return res.render('user', { user: req.user.username });
            }

            // If short URL doesn't exist, return 404 error
            res.status(404).json({ error: 'Short URL not found' });
        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createShortUrl: async (req, res) => {

        try {
            const { originalUrl } = req.body;

            // Validate the long URL
            if (!validUrl.isUri(originalUrl)) {
                res.status(400).json({ error: 'Invalid URL' });
            }

            // Check if the long URL already exists in the database
            const existingUrl = await urlModel.findOne({ originalUrl });

            if (existingUrl) {
                return res.status(201).send("Url already exist. view your url history")
            }

            const shortenedUrl = `http://localhost:4000/${shortid.generate()}`;

            const url = await urlModel.create({
                originalUrl: originalUrl,
                shortenedUrl: shortenedUrl,
                clicks:[],
                user: req.user._id
            });

            res.redirect(303, "/shorten");

        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Route for redirecting short URLs
    // getShortUrlById: async (req, res) => {
        
    //     const short = `http://localhost:4000/${req.params.id}`;
    //     try {
    //         // Find the corresponding URL document in the database
    //         const url = await urlModel.findOne({url: short.shortenedUrl});
    //         // If short URL doesn't exist, return 404 error
    //         if(!url) {
    //             return res.status(404).send("Url not found");
    //         }
    //         if (url) {
    //             console.log(url.originalUrl)
    //             // Redirect to the original URL
    //             // return res.redirect(url.originalUrl);
    //             return res.redirect(url.originalUrl);
    //         }
    //     } catch (error) {
    //         // Handle any errors that occurred during the database operation
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //     }
    //  }
}