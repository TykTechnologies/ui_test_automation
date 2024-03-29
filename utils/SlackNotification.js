const https = require('https');
const { Promise } = require('bluebird');
// const git = require('git-rev-sync');
var timediff = require('timediff');
const fs = require('fs');

const webHookURL = process.env.SLACK_WEBHOOK_URL;
const slackUser = process.env.SLACK_USER_NAME || "";
const pathToResults = '../../../results/json/wdio-merged.json';

var isExecutionFailed = false;

const sendPromise = (messageBody) => { //promise for http request
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(webHookURL, requestOptions, (res) => {
      let response = '';        
        
      res.on('data', (d) => {
        response += d;
      });
        
      // response finished, resolve the promise with data
      res.on('end', () => {
        console.log(">>> Slack notifiction was sent")
        resolve(response);
      })
    });
        
    // on error -> reject the promise
    req.on('error', (e) => {
      reject(e);
    });
        
    req.write(messageBody);
    req.end();
  });
}

let mergedResults;
try{
  mergedResults = require(pathToResults);
}catch(e){ //setting values for failed execution report
  isExecutionFailed = true;
  mergedResults = {
    "state":{"passed":"Error", "failed":`<https://github.com/${process.env.FRAMEWORK_REPO}/actions/runs/${process.env.JOB_RUN_ID}|Please check execution logs>`}, 
    "suites": []
  };
}

const redHexCode = "#FF0000";
const greenHexCode = "#2eb886";

const duration = timediff(mergedResults.start, mergedResults.end, 'mS');
// const masterBranchCommitMessage = require('child_process')
//   .execSync('git log -1 --pretty=%B origin/master')
//   .toString().trim();

let messageBody = {
  "username": "Automated test", // This will appear as user name who posts the message
  "text": "UI automate tests",
  "icon_emoji": "#status_icon#", // User icon, default value
  "blocks": [
    //TODO add link and commit message from env
    // {
    //   "type": "section",
    //   "text": {
    //     "type": "mrkdwn",
    //     "text": `:octocat: *git commit*: ${masterBranchCommitMessage}`
    //   }
    // },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:computer: *test env*: ${process.env.WDIO_TEST_ENV}`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:tyk17: *triggered by*: ${process.env.EVENT_TRIGGER}`
      }
    },
    // {
    //   "type": "section",
    //   "text": {
    //     "type": "mrkdwn",
    //     "text": `:octocat: *git branch for test scripts*: ${git.branch()}`
    //   }
    // },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:link: <https://github.com/${process.env.FRAMEWORK_REPO}/actions/runs/${process.env.JOB_RUN_ID}|Execution page>`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:github: Framework branch: ${process.env.GIT_BRANCH}`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:clock10: Duration: ${duration.minutes}min ${duration.seconds}s ${(duration.minutes > 5) ? ":this_is_fine:" : ":fast_parrot:"}`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:checkered_flag: Tests: 
        Passed - ${mergedResults.state.passed} 
        Failed - ${mergedResults.state.failed} ${(mergedResults.state.failed > 0) ? ":sad_parrot:" : ""} 
        Skipped - ${mergedResults.state.skipped}
        ${(mergedResults.state.failed > 0) && slackUser !=""  ? `cc ${slackUser}` : ""}`
      }
    }
  ],
  "attachments": [],
}

const addTests = () => mergedResults.suites.forEach(describe => {  
  
  const failedTests = describe.tests.filter(test => isTestFailed(test));
  const isHookFailed = JSON.stringify(describe.hooks).includes('error');
  if (failedTests.length > 0 || isHookFailed) {
    isExecutionFailed = true;
    messageBody["attachments"].push(
      {
        "color": redHexCode,
        "fallback": "Test was not added!!",
        "title": `<https://github.com/${process.env.FRAMEWORK_REPO}/actions/runs/${process.env.JOB_RUN_ID}|${describe.name}>`  
      })
  }
});

const isTestFailed = (test) => {
  if (!test.hasOwnProperty("state")) {
    return true;
  }
  if (test.state === "passed" || test.state === "skipped") {
    return false;
  } else {
    return true;
  }
}

const sendNotification = () => {
  addTests();
  if (mergedResults.state.failed > 0)
    isExecutionFailed = true;
  if (isExecutionFailed){
    messageBody["icon_emoji"] =  ":red_circle:";
    messageBody["text"] += " FAILED!";
  }    
  else{
    messageBody["icon_emoji"] =  ":white_check_mark:";
    messageBody["text"] += " PASSED";
  }

  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  console.log('>>> Sending slack notification: ' + messageBody);
  sendPromise(messageBody).timeout(10000)
    .catch(Promise.TimeoutError, err => console.log(`>>>> Error while sending Slac notification: ${err}`)) 
}

sendNotification();
