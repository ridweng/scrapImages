const cheerio = require("cheerio");
const request = require('request');
const util = require('util');
const requestPromise = util.promisify(request);

const url = 'https://www.graymatics.com'
// const url = 'https://www.bridgeport.edu'
// const url = 'https://www.toyotabharat.com/virtual-showroom/innova.html'

async function scrape(){
    try{
        const data = await requestPromise(url)
        console.log(`Status code: ${data.statusCode}`)
        const $ = cheerio.load(data.body)

        $("img").each((index, image)=>{
            const img = $(image).attr('src');
            let links = img
            if(!img.startsWith('http')){
                links = url + img
            }
            console.log(links)
            //Do something with the links, they can be wrote in a .txt file
        });
    } catch(err){
        console.error(err)
    }
}

scrape()