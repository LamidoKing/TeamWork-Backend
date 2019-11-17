
/**
* @swagger
* /articles:
*   post:
*     tags:
*       - Articles
*     name: articles
*     summary: Post artcle
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
*           $ref: '#/definitions/Article'
*           type: object
*           properties:
*             article:
*               type: string
*         required:
*           - article
*     responses:
*       '200':
*         description: Article post successfully
*       '401':
*         description: Bad username, not found in db
*       '403':
*         description: Username and password don't match
/articles/:id:
*   patch:
*     tags:
*       - Articles
*     name: Edit OwnPosted Article
*     summary: Edit Own Posted Article
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
*           type: object
*           properties:
*             title:
*               type: string
*             article:
*               type: string
*         required:
*           - title
*           - article
*     responses:
*       '200':
*         description:  success
*       '401':
*         description: doent exist

*   delete:
*     tags:
*       - Articles
*     name: Delete Article
*     summary: Delete Own Posted Article
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     security:
*       - bearerAuth: []
*     responses:
*       '200':
*         description:  success
*       '401':
*         description: No authorization / user not found
*   get:
*     tags:
*       - Articles
*     name: Get specific Article
*     summary: Edit Own Posted Article
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: params
*         schema:
*           type: object
*           properties:
*             title:
*               type: string
*             article:
*               type: string
*             comment:
*         required:
*           - title
*           - article
*     responses:
*       '200':
*         description: success
*       '401':
*         description: No authorization / user not found

/articles/:id/comment:
*   post:
*     tags:
*       - Articles
*     name: Commet Article
*     summary: Comment other Posted Article
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     security:
*       - bearerAuth: []
*     parameters:
*       - id: body
*         in: body
*         schema:
*           $ref: '#/definitions/Comment'
*         required:
*           - comment
*     responses:
*       '200':
*         description: success
*       '401':
*         description: No authorization / user not found


/article/:id/flag:
*   post:
*     tags:
*       - Articles
*     name: flag Article inaproprite
*     summary: flag  Posted Article inaproprite
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
*           $ref: '#/definitions/Flag'
*           properties:
*             title:
*               type: string
*             article:
*               type: string
*         required:
*           - title
*           - article
*     responses:
*       '200':
*         description:  success
*       '401':
*         description: No authorization / user not found
*/
