const { Router } = require('express')
const Game = require('../../models/Game')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const gameList = await Game.find()
        if (!Game) throw new Error('No Todo List found')
        res.status(200).json(gameList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newGame = new Game(req.body)
    try {
        const game = await newGame.save()
        if (!game) throw new Error('Something went wrong saving the Todo')
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Game.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router