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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

//Import package
const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
  
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
  
  //Find the oldest version
  var oldest = {"name":"", "date": ""}
  data.content.forEach(element => {
    if (element.package.date < oldest.date || oldest.date == '') {
      oldest.name = element.package.name
      oldest.date = element.package.date
    }    
  });
  
  //Output
  var name = oldest.name

  return name
};
