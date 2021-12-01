const collectionRouter = require('express').Router()
const os_scraper = require('../services/os_scrape')

collectionRouter.get('/', async (request, response) => {
    const html_response = await os_scraper.getTopCollections()

    response.json(html_response)
})

module.exports = collectionRouter