// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  let postTimes = []
  
  // locator to get the times of each post
  var elements = page.locator('#hnmain > tbody span > span[title]');
  var count = await elements.count()

  //each page has 30 posts, so get 1-30 in this round
  for(var i = 0 ; i < count; i++){
    let timestamp = await elements.nth(i).getAttribute('title')
    postTimes.push(timestamp)
  }
  console.log()
  const nextpage = page.locator('a.morelink[rel="next"]');

  await nextpage.click()

  // ====================NEXT PAGE=============================
  elements = page.locator('#hnmain > tbody span > span[title]');
  count = await elements.count()
  //getting 30-60 in this round
   for(var i = 0 ; i < count; i++){
    let timestamp = await elements.nth(i).getAttribute('title')
    postTimes.push(timestamp)
  }
  await nextpage.click()

  //====================NEXT PAGE=============================
  
  elements = page.locator('#hnmain > tbody span > span[title]');
  count = await elements.count()
  //getting 60-90 in this round
  for(var i = 0 ; i < count; i++){
    let timestamp = await elements.nth(i).getAttribute('title')
    postTimes.push(timestamp)
  }
  await nextpage.click()
  
  // ====================NEXT PAGE=============================
  elements = page.locator('#hnmain > tbody span > span[title]');
  count = await elements.count()
  //so get 90-100 in this round
  //stopping at 10 more posts because we want EXACTLY 100 post times
  for(var i = 0 ; i < 10; i++){
    let timestamp = await elements.nth(i).getAttribute('title')
    postTimes.push(timestamp)
  }
  // array for only the UNIX timestamps
  cleanedArr= []

  for(var i = 0 ; i < postTimes.length; i++){
    datestring = postTimes[i].split(' ')
    cleanedArr.push(datestring[1])
  }
  //Unix time measures time elapsed since jan 1 1970
  //now verify that the array is going in DESCENDING order
  function isDescending(arr){
    for(let i = 1 ; i < arr.length; i++){
      //if previous element greater than next element
      //then it is NOT in descending order aka post times newest to oldest
      if(Number(arr[i-1]) < Number(arr[i]) ){
        return false
      }
    }
    //if we have checked the whole array then return true
    return true
  }
  console.log('====== TEST RESULTS ======')
  if(isDescending(cleanedArr)){
    console.log('CONGRATULATIONS, THE FIRST 100 ITEMS ARE SORTED IN ORDER! \n')
  }
  else{
    console.log('SORRY, THE FIRST 100 ITEMS ARE NOT SORTED IN ORDER! \n')
  }

  //until this line the program doesn't end
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
