fs = require('fs');

let docText;
const pathToResults = process.env.PATH_TO_RESULTS;

docText = "# Functionality covered in automated tests:\n";

let mergedResults;
try{
    mergedResults = require(pathToResults);
}catch(e){ 
    console.error('Unable to load result file!! ' + e.message);
};

mergedResults.suites.forEach(describe => {
    docText += `<details>\n <summary>${describe.name}</summary>\n\n`;
    describe.tests.forEach(test => docText += `+ ${test.name}\n`);
    docText += `</details>\n`;
});

fs.writeFile("coverage.md", docText, err => {
    if (err) {
        console.error(err);
        return;
    }
});
