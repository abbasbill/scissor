const { urlModel } = require('../models')
var validUrl = require('valid-url');
const shortid = require('shortid');
const cache = require("../config/redis")
const httpStatus = require('http-status');


exports.urlController = {

    // generating short URLs
    createShortUrl: async (req, res) => {
        try {
            const { originalUrl } = req.body;
            // Validate the long URL
            if (!validUrl.isUri(originalUrl)) {
                res.status(400).json({ error: 'Invalid URL' });
            }

            // Check if the long URL already exists in the database
            const existingUrl = await urlModel.findOne({ $and: [{ user: req.user._id }, { originalUrl: originalUrl }] });

            if (existingUrl) {
                return res.status(201).send("Url already exist")
            }

            const shortenedUrl = `https://titly.onrender.com/${shortid.generate()}`;

            const url = await urlModel.create({
                originalUrl: originalUrl,
                shortenedUrl: shortenedUrl,
                clicks: [],
                user: req.user._id
            });
            // returns url object if req.header("content-type") === 'application/json'

            if (req.header("content-type") === 'application/json') {
                res.status(httpStatus.CREATED).send({ url });
            } else {
                // else redirects to the shorten endpoint if req.header("content-type") !== 'application/json'
                return res.redirect(303, "/api/shorten");
            }

        } catch (error) {
            // Handle any errors that occurred during the database operation
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    // fetching users URL
    getUserUrls: async (req, res) => {
        if (req.headers.referer && req.headers.referer.includes('api/docs')) {
            try {
                // Find the corresponding URL document in the database
                const urls = await urlModel.find({ user: req.user._id });
                if (urls) {
                    return res.status(httpStatus.OK).send({ urls });
                }

            } catch (error) {
                // Handle any errors that occurred during the database operation
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {

            try {
                // Find the corresponding URL document in the database
                const urls = await urlModel.find({ user: req.user._id });
                if (urls) {
                    res.locals.urls = urls;
                }
                return res.render('user', { user: req.user.username });

            } catch (error) {
                // Handle any errors that occurred during the database operation
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },



    // redirecting short URLs to original URL
    getOriginalUrl: async (req, res) => {
        if (req.headers.referer && req.headers.referer.includes('api/docs')) {
            try {
                const shortUrl1 = req.params.shortenedUrl;
                // Find the corresponding URL document in the database
                const url = await urlModel.findOneAndUpdate({ shortenedUrl: shortUrl1 },
                    { $push: { clicks: { timestamp: Date.now() } } }
                );

                // If short URL doesn't exist, return 404 error
                if (!url) {
                    return res.status(404).send("Url does not exist");
                }
                if (url) {
                    const results = req.params.shortenedUrl
                    await cache.set(results, JSON.stringify(url.originalUrl), {
                        EX: 380,
                        NX: true,
                    });
                }

                //  Redirect to the original URL                
                return res.send({ originalUrl: url.originalUrl });

            } catch (error) {
                // Handle any errors that occurred during the database operation
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            try {
                const shortUrl2 = `https://titly.onrender.com/${req.params.shortenedUrl}`;
                    console.log(shortUrl2)
                // Find the corresponding URL document in the database
                const url = await urlModel.findOneAndUpdate({ shortenedUrl: shortUrl2 },
                    { $push: { clicks: { timestamp: Date.now() } } }
                );

                // If short URL doesn't exist, return 404 error
                if (!url) {
                    return res.status(404).send("url Not found");
                }
                if (url) {
                    const results = req.params.shortenedUrl
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
    },


    // deleting users URL
     deleteUserUrl: async (req, res) => {
        if(req.headers.referer && req.headers.referer.includes('api/docs')){
            try {
                const deleteUrlId = req.params.id;
                console.log(deleteUrlId)
                // Find the corresponding URL document in the database
                const url = await urlModel.findOneAndDelete({ _id: deleteUrlId });
                if (!url) {
                    return res.status(404).send("Url does not exist");
                }
                    res.status(200).send("Url deleted successfully");
            } catch (error) {
                // Handle any errors that occurred during the database operation
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            try {
                const deleteUrl = req.params.id;
                console.log(deleteUrl)
                // Find the corresponding URL document in the database
                const url = await urlModel.findOneAndRemove({ _id: deleteUrl });
                return res.redirect(303, "/api/shorten");;    
            } catch (error) {
                // Handle any errors that occurred during the database operation
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
       
     }
}