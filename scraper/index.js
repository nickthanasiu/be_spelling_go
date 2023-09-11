require('dotenv').config();
const puppeteer = require('puppeteer');
const axios = require('axios');

async function scrapeSpellingBee(){

    // "Be spelling" api url
    const { BS_API_URL } = process.env;

    const { log, error } = console;

    log('Launching browser...');

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();

    const SPELLING_BEE_URL = 'https://www.nytimes.com/puzzles/spelling-bee';

    log(`Navigating to ${SPELLING_BEE_URL}...`);
    await page.goto(SPELLING_BEE_URL);

    const gameData = await page.evaluate(`window.gameData.pastPuzzles.lastWeek[0]`);
    
    const { 
        printDate: date,
        centerLetter,
        outerLetters: letters,
        pangrams,
        answers
    } = gameData;

    const words = answers.slice(pangrams.length);

    const requestObj = {
        date,
        centerLetter,
        letters,
        pangrams,
        words,
    };

    // @TODOS API:
    // Do not add puzzle if letters wrong length
    // Validate every field on requestObj
    // Do not add puzzle if puzzle from date already exists

    // Post parsed data to Be Spelling api/puzzles endpoint to add puzzle to db
    try {
        log(`Starting API post request to ${BS_API_URL}`);

        const response = await axios.post(
            `${BS_API_URL}`,
            requestObj
        );

        log(`Responded with status: ${response.status}`);
        log(`Response data: `, response.data);

    } catch (err) {
        error(`Error on API post request to ${BS_API_URL}`);
        error(err.response.data);
    }

    log(`Our work here is done. Closing browser...`);
    await browser.close();

}

scrapeSpellingBee();