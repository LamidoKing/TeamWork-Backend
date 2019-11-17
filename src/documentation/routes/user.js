
/**
* @swagger
* /signin:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a admin and employees
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       '200':
*         description: User found and logged in successfully
*       '401':
*         description: Bad username, not found in db
*       '403':
*         description: Username and password don't match
/create-user:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a admin and employees
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       '200':
*         description: User found and logged in successfully
*       '401':
*         description: Bad username, not found in db
*       '403':
*         description: Username and password don't match
*/
