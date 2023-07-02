
var express = require('express');
const {urlController} = require('../controllers/urlController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware

var urlRouter = express.Router();
// Route for generating short URLs
urlRouter.post('/',  connectEnsureLogin.ensureLoggedIn(), urlController.createShortUrl);

// Route for fetching users URL
urlRouter.get('/', connectEnsureLogin.ensureLoggedIn(), urlController.getUserUrls);


module.exports = urlRouter;



/**
 * @swagger
 * tags:
 *   name: Url
 *   description: Url management and retrieval
 */

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Create a short url
 *     description: Only authenticated users can create short urls.
 *     tags: [Url]
 *     security:
 *       - passport-local authentication: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               original:
 *                 type: string
 *             example:
 *               originalUrl: http://www.longurl.com
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Url'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all user shortened urls
 *     description: Only authenticated users can access their urls.
 *     tags: [Url]
 *     security:
 *       - passport-local: []
 *     parameters:
 *       - in: query
 *         userId: user_id
 *         schema:
 *           type: string
 *         description: Username
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Url'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a url
 *     description: any user can fetch only the originalUrl associated with the provided shortened url.
 *     tags: [Url]
 *     security:
 *       - passport-local: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Url id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Url'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a url
 *     description: only authenticated users can delete their urls.
 *     tags: [Url]
 *     security:
 *       - passport-local: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Url id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
