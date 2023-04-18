const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


async function start() {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
});
    const page = await browser.newPage();
    await page.goto('https://www.careerbuilder.com/jobs?cb_workhome=true&emp=&keywords=Quality+Analyst&location=Work+from+Home%2FRemote&page_number=1');
    //await page.screenshot({ path: 'careerbuilder.png' });
    const dataHandles = await page.$$('.relative');
    const data = [];
    for (const datahandle of dataHandles) {
       try {
    const title = await page.evaluate(el => el.innerText, datahandle);
    data.push({ title });
}   catch (error) { }
}


    const csvWriter = createCsvWriter({
    path: 'careerbuilder.csv',
header: [
{ id: 'title', title: 'Title' },
    ]
});


await csvWriter.writeRecords(data);
console.log('CSV file written successfully');
await browser.close();
}
start();

