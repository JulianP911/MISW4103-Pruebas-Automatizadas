const fs = require('fs');

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year} ${hours}_${minutes}_${seconds}`;

    return formattedDate;
}

const formattedDate = formatDate(new Date());

const takeCustomScreenshot = async (driver, step, then) => {
    if (!fs.existsSync(`./screenshots/v5.71/${formattedDate}`) && step != null) {
        fs.mkdirSync(`./screenshots/v5.71/${formattedDate}`, { recursive: true });
    }

    if(step != null) {
        await driver.saveScreenshot(`./screenshots/v5.71/${formattedDate}/step_${step}.png`);
    } else {
        await driver.saveScreenshot(`./screenshots/v5.71/${formattedDate}/then_${then}.png`);
    }
}

module.exports = {
    takeCustomScreenshot
}