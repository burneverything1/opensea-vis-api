const wikiRouter = require('express').Router()
const wikiScrape = require('../services/wikiscrape')

wikiRouter.get('/:query', async (request, response) => {
    const test_res = await wikiScrape.getImage(request.params.query)
    console.log(test_res);
    response.json('hello')
})

module.exports = wikiRouter