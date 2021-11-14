/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

 const fetch = require('node-fetch');

module.exports = async function countMajorVersionsAbove10() {
  
    var count = 0

    const body = {
      "url": "https://api.npms.io/v2/search/suggestions?q=react",
      "method": "GET",
      "return_payload": true
    }
    
    //Post request to api
    const response = await fetch('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    
    //Check version and incremente count number
    for (let index = 0; index < data.content.length; index++) {
      const element = data.content[index];
      var version = element.package.version.split(".")[0]
      if (version >= 10) {
        count += 1
      } 
    }

return count
};
