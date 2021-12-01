const collectionRouter = require('express').Router()
const os_scraper = require('../services/os_scrape')

const groupBySix = (input_arr) => {
    const org_list = []
    let temp_arr = []
    let six_count = 0

    input_arr.forEach((val) => {
        temp_arr.push(val)
        six_count++

        if (six_count === 6) {
            org_list.push(temp_arr)
            temp_arr = []
            six_count = 0
        }
    })

    return org_list
}

collectionRouter.get('/', async (request, response) => {
    const html_response = await os_scraper.getTopCollection()
    response.json(groupBySix(html_response))
})

module.exports = collectionRouter