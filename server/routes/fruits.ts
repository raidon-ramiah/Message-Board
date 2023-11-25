import express from 'express'
import { MessageData } from '../../models/message.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/messages.ts'

const router = express.Router()

// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', async (req, res) => {
  try {
    const messages = await db.getMessage()
    res.json({ messages })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/fruits
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { message } = req.body as { message: MessageData }
  const auth0Id = req.auth?.sub
  if (!message) {
    console.error('No fruit')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const newMessage = await db.addMessages(message, auth0Id)

    res.status(201).json({ message: newMessage })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// TODO: use checkJwt as middleware
// PUT /api/v1/fruits
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const { message } = req.body as { message: MessageData }
  const auth0Id = req.auth?.sub

  const id = Number(req.params.id)

  if (!message || !id) {
    console.error('Bad Request - no fruit or id')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    const updatedMessage = await db.updateMessages(id, message)

    res.status(200).json({ message: updatedMessage })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error instanceof Error && error.message === 'Unauthorized') {
        return res
          .status(403)
          .send(
            'Unauthorized: Only the user who added the message may update it'
          )
      }
      res.status(500).send('Something went wrong')
    }
  }
})

// TODO: use checkJwt as middleware
// DELETE /api/v1/fruits
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  if (!id) {
    console.error('Invalid id')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    await db.deleteMessage(id)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Unauthorized: Only the user who added the msg may update it')
    }
    res.status(500).send('Something went wrong')
  }
})

export default router
