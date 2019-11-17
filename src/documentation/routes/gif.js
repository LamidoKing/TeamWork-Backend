
/**
* @swagger
* /gifs:
*   post:
*     tags:
*       - Gifs
*     name: gifs
*     summary: Post gif
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
*           $ref: '#/definitions/Gif'
*           type: object
*           properties:
*             ImageUrl:
*               type: string
*         required:
*           - Imageurl
*     responses:
*       '200':
*         description: success
*       '401':
*         description: Bad username, not found in db
*       '403':
*         description: Username and password don't match
/gifs/:id:
*   patch:
*     tags:
*       - Gifs
*     name: Edit OwnPosted Gif
*     summary: Edit Own Posted Gif
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
*             imageUrl:
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
*       - Gifs
*     name: Delete Gif
*     summary: Delete Own Posted Gif
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
*       - Gifs
*     name: Get specific Gif
*     summary: Edit Own Posted Gif
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
*     responses:
*       'data':
*         $ref: '#/definitions/Gif'
*         comment: '#/definitions/Comment'

*       '200':
*         description:  success
*       '401':
*         description: No authorization / user not found

/gifs/:id/comment:
*   post:
*     tags:
*       - Gifs
*     name: Commet Gif
*     summary: Comment other Posted Gif
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
*         description: comment post successfully
*       '401':
*         description: No authorization / user not found


/gifs/:id/flag:
*   post:
*     tags:
*       - Gifs
*     name: flag Gif inaproprite
*     summary: flag  Posted Gif inaproprite
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
*         description: success
*       '401':
*         description: No authorization / user not found
*/
