const axios = require('axios')
const cheerio = require('cheerio')

const getTopCollection = async () => {
    const response = await axios.get('https://www.nft-stats.com/top-collections/7d')
    const $ = cheerio.load(response.data)

    const return_data = []

    const table = $('table').children('tbody').find('td')
    table.each((i, element) => {
        return_data.push($(element).text().replace(/\n/g,'').replace('[🔎 Rarity Explorer]','').trim())
    })

    return return_data
}

module.exports = {getTopCollection}