const axios = require('axios')
const cheerio = require('cheerio')
const pretty = require('pretty')

const getTopCollections = async () => {
    const response = await axios.get('https://www.nft-stats.com/top-collections/7d')
    console.log('got here');
    const $ = cheerio.load(response.data)
    //const top_sales = html('table[class=table.table-sm]').children('table')
    const table = $('table').children('tbody')
    console.log(pretty(table.html()));
    //return top_sales
}

module.exports = {getTopCollections}