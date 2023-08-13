
var express = require('express');
const {urlController} = require('../controllers/urlController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware

var urlRouter = express.Router();
// Route for generating short URLs
urlRouter.post('/',  connectEnsureLogin.ensureLoggedIn("/auth/login"), urlController.createShortUrl);

// Route for fetching users URL
urlRouter.get('/', connectEnsureLogin.ensureLoggedIn("/auth/login"), urlController.getUserUrls);

urlRouter.get('/delete/:id', connectEnsureLogin.ensureLoggedIn("/auth/login"), urlController.deleteUserUrl);

urlRouter.post('/qrcode', connectEnsureLogin.ensureLoggedIn("/auth/login"), urlController.getQrCode);

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
 *     summary: Get all user shortened urls by their userid
 *     description: Only authenticated users can access their urls.
 *     tags: [Url]
 *     security:
 *       - passport-local: []
 *     parameters:
 *       - in: query
 *         userId: user_id
 *         schema:
 *           type: string
 *         description: UserId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
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
 * '/{shortenedUrl}':
 *   get:
 *     summary: Get the originalUrl associated with a provided shortenedUrl
 *     description: any user can fetch only the originalUrl associated with the provided shortened url.
 *     tags: [Url]
 *     parameters:
 *       - in: path
 *         name: shortenedUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: shortenedUrl
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
 */

/**
 * @swagger
 * '/api/shorten/{id}':
 *   delete:
 *     summary: Delete a url
 *     description: only authenticated users can delete their urls.
 *     tags: [Url]
 *     security:
 *       - passport-local: []
 *     parameters:
 *       - in: query
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