// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *     npm start --prefix ./lgf-test
 * 
 *    (use cd .. if you are not in workspace)
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

//I: an array of objects (collection of customers)
//O: the number of customers that are male

var maleCount = function(array){
    let males = _.filter(array, function(customer){
         return customer.gender === 'male';
    });

    return males.length;
};

//I: an array of objects (collection of customers)
//O: the number of customers that are female
//C: use reduce

var femaleCount = function(array) {
    let females = _.reduce(array, function(acc, current) {
          if (current.gender === 'female') {
            return acc += 1;
          } else {
            return acc;
          }
    }, 0);
    return females;
};

//I: an array of objects (collection of customers)
//O: the name of the oldest customer
//C: use reduce

var oldestCustomer = function(array) {
   let oldest = _.reduce(array, function(acc, current) {
    //don't need a seed value because we are looking for oldest customer
    if (acc.age > current.age) {
      return acc;
    } else {
      return current;
    }
   });
   return oldest.name;
};

//I: an array of objects (collection of customers)
//O: the name of the youngest customer

var youngestCustomer = function(array) {
  let youngest = _.reduce(array, function(acc, current) {
   //don't need a seed value because we are looking for youngest customer
   if (acc.age < current.age) {
     return acc;
   } else {
     return current;
   }
  });
  return youngest.name;
};

//I: an array of objects (collection of customers)
//O: find the average balance of all customers

function averageBalance(array) {

  let numBalance = array.reduce((acc, current) => {
    if (current) {
      acc.push(Number(current.balance.replaceAll(/[$,]/g,'')));
    }
    return acc;
  }, []);

  let total = 0;
  let numCount = 0;

  for (let i = 0; i < numBalance.length; i++) {
     total += numBalance[i];
     numCount += 1;
   }  

  return total/numCount;
}

//I: an array of objects (collection of customers), and a target letter
//O: return the number of times any customer's name starts with the given letter

function firstLetterCount(array, letter) {

  let letterSearch = array.reduce((acc, current) => {
    if (current.name.charAt(0) === letter.toUpperCase() || current.name.charAt(0) === letter.toLowerCase()) {
      acc += 1;
    }
    return acc;
  }, 0)

  return letterSearch;
  
}

//I: an array of objects (collection of customers)
//O: the number of friends a given customer has that have names that start with the indicated letter

function friendFirstLetterCount(array, customer, letter) {

  let friendSearch = array.reduce((acc, current) => {
    if (current.name === customer) {
      for (let i = 0; i < current.friends.length; i++) {
         if (current.friends[i].name.charAt(0) === letter.toUpperCase() || current.friends[i].name.charAt(0) === letter.toUpperCase()) {
             acc += 1;
         }
      }
    }
    return acc;
  }, 0)

  return friendSearch;
}

//I: an array of objects (collection of customers)
//O: an array of all customers that are friends with the given name

function friendsCount(array, name) {
  let findAllFriends = array.reduce((acc, current) => {
      for (let i = 0; i < current.friends.length; i++) {
         if (current.friends[i].name === name) {
             acc.push(current.name);
         }
      }
    return acc;
  }, [])
  return findAllFriends;
}

//I: an array of objects (collection of customers)
//O: find the three most common tags within each customer object

function topThreeTags(array) {

  let tagArray = array.reduce((acc, current) => {
    for (let i = 0; i < current['tags'].length; i++) {
      acc.push(current.tags[i]);
    }
    return acc;
  }, []);

  let countObj = tagArray.reduce((acc, current) => {
    if (acc[current]) {
      acc[current] += 1;
    } else {
      acc[current] = 1;
    }
      return acc;
    }, {});

  // [[d, 3], [c, 2], [a, 1]] => change object to a nested array
  let objArray = Object.entries(countObj);
   
  //array.sort() method to sort the nested array alphabetically
  objArray.sort((a, b) => b[1] - a[1]);

  let topThree = objArray.slice(0, 3); 
  let unNest = [];

  for (let j = 0; j < topThree.length; j++) {
    unNest.push(topThree[j][0]);
  }

 return unNest;

}  

//I: an array of objects (collection of customers)
//O: an object with a key of every gender and value of occurances of said gender within the array
//C: use reduce

function genderCount(array) {
 let genderObj = array.reduce((acc, current) => {
  if (acc[current.gender]) {
    acc[current.gender] += 1;
  } else {
   acc[current.gender] = 1;
  }
  return acc;
 }, {});

 return genderObj;
}

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;