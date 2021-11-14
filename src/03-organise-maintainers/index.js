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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */

//Import package
const fetch = require('node-fetch');

module.exports = async function organiseMaintainers() {
  let maintainers = []

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

  //Get an unqiue array of object with username
  data.content.forEach(element => {
    var users = new Set(maintainers.map(d => d.username));
    maintainers = [...maintainers, ...element.package.maintainers.filter(d => !users.has(d.username))];
  });
  maintainers.forEach(function(v){ delete v.email; v.packageNames=[] });
  
  //Add package names to maintainers array
  data.content.forEach(element => {
    const maintainerList = element.package.maintainers
    for (let index = 0; index < maintainerList.length; index++) {
      const dev = maintainerList[index].username;
      var pos = maintainers.map(function(e) {return e.username}).indexOf(dev);
      maintainers[pos].packageNames.push(element.package.name)
      maintainers[pos].packageNames.sort()
    }
  });
  
  //Sort the maintainers array by username
  maintainers.sort((a, b) => a.username.localeCompare(b.username))
  
  return maintainers
};
