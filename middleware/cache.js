const cache = require("../config/redis")

const cacheData = async(req, res, next) => {
    const results  = req.params.id;

  try {
    const cacheResults = await cache.get(results);
    console.log(cacheResults)
    if (cacheResults) {
     const results = JSON.parse(cacheResults);
    //  console.log(results.originalUrl)
      return res.redirect(results.originalUrl);

    //   res.send({
    //     fromCache: true,
    //     data: results,
    //   });

    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}

module.exports = cacheData;