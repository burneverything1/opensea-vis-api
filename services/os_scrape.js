const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')

const getTopCollections = async () => {
    const response = await axios.get('https://www.nft-stats.com/top-collections/7d')
    const $ = cheerio.load(response.data)

    const return_data = []

    const table_anchors = $('table').children('tbody').find('a')
    table_anchors.each((i, element) => {
        let anchor_text = $(element).text()
        if (anchor_text !== "" && anchor_text !== '[🔎 Rarity Explorer]') {
            return_data.push(anchor_text)
        }
    })

    console.log(return_data);
    return return_data
}

module.exports = {getTopCollections}