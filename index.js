const puppeteer = require('puppeteer')
const screenshot = 'github.png';

const employees = {
    joao: {
        workHours: 8,
    },
    gustavo: {
        workHours: 8,
    },
    lucas: {
        workHours: 6,
    }
};

async function main() {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto('https://github.com/login')

    await page.type('#login_field', 'b')
    await page.type('#password', 'a')
    await page.click('[name="commit"]')
    await page.waitForNavigation()

    await page.goto('https://github.com/orgs/x/projects/1');

    await page.waitForNavigation();

    await page.screenshot({ path: screenshot })
        
    const backlogCardHours = await page.$$eval('#column-13547715 .hx_IssueLabel span', e => {
        var abafet = 0;
        console.log(e);
        return e.map(hour => {
            abafet = abafet + 1;
            console.log(abafet);
            return parseInt(hour.innerHTML.replace(/h/g, ''));
        })
    });

    const total = backlogCardHours.reduce((accumulator, current) => {
        return accumulator + current;
    });

    console.log(`total de horas: ${total}`);

    const workHoursTotal = Object.keys(employees).reduce((acc, employee) => {
        return acc + employees[employee].workHours;
    }, 0);
    const totalEmployees = Object.keys(employees).length;
    const workHoursAvg = workHoursTotal / totalEmployees;

    const sprintTime = parseInt(total) / totalEmployees / workHoursAvg;

    console.log(`tempo sprint: ${sprintTime}`);

    browser.close()
} 

main();