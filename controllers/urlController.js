const { urlModel } = require('../models')
var validUrl = require('valid-url');
const shortid = require('shortid');
const cache = require("../config/redis")
const httpStatus = require('http-status');
exports.urlController = {
    // Route for generating short URLs
    createShortUrl: async (req, res) => {
        try {
            const { originalUrl } = req.body;

            // Validate the long URL
            if (!validUrl.isUri(originalUrl)) {
                res.status(400).json({ error: 'Invalid URL' });
            }

            // Check if the long URL already exists in the database
            const existingUrl = await urlModel.findOne({ $and: [{user: req.user._id}, { originalUrl: originalUrl }]});

            if (existingUrl) {
                return res.status(201).send("Url already exist")
            }

            const shortenedUrl = `https://titly.onrender.com/${shortid.generate()}`;

            const url = await urlModel.create({
                originalUrl: originalUrl,
                shortenedUrl: shortenedUrl,
                clicks:[],
                user: req.user._id
            });
                // returns user object if req.header("content-type") === 'application/json'
						if (req.header("content-type") === 'application/json') {
							return res.status(httpStatus.CREATED).send({url});
						}
				// redirects to the shorten page if req.header("content-type") !== 'application/json'
                            res.redirect(303, "/api/shorten");

        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUserUrls: async (req, res) => {
        try {
            // Find the corresponding URL document in the database
            const urls = await urlModel.find({ user: req.user._id});
            if (urls) {
                res.locals.urls = urls;
                return res.render('user', { user: req.user.username });
            }
        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Route for redirecting short URLs to original URL
    getOriginalUrl: async (req, res) => {
        const short = `https://titly.onrender.com/${req.params.id}`;
        console.log(req.params.id)
        try {
            // Find the corresponding URL document in the database
            const url = await urlModel.findOneAndUpdate({shortenedUrl:short},
                { $push: { clicks: { timestamp: Date.now() } } }
                 );

            // If short URL doesn't exist, return 404 error
            if(!url) {
                return res.status(404).send("Resource Not found");
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