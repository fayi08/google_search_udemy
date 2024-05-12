const assert = require('assert');

describe('Google Search Test', () => {
 

    after(async () => {
        if (browser) {
            await browser.deleteSession();
        }
    });


    it('Step 1: Go to Google site', async () => {
        await browser.url('https://www.google.com');
        const title = await browser.getTitle();
        assert.ok(title.includes('Google'), 'Step 1 failed: Failed to navigate to Google site.');
    });

    it('Step 2: Search for the Keyword "Test Automation Learning"', async () => {
        await browser.pause(2000); 
        const searchInput = await browser.$('textarea[name="q"]');
        await searchInput.setValue('Test Automation Learning');
        const searchButton = await browser.$('input[value="Google Search"]');
        await searchButton.click();
        // Assertion: Verify if the title of the current page contains the search keyword
        const title = await browser.getTitle();
        assert.ok(title.includes('Test Automation Learning'), 'Step 2 failed: Failed to search for the keyword.');
    });

    it('Step 3: Select the link with Udemy course', async () => {
      // Wait for the Udemy link to exist
      await browser.waitUntil(async () => {
          const udemyLink = await browser.$('//span[text()="Udemy"]');
          return await udemyLink.isExisting();
      }, {
          timeout: 3000, 
          timeoutMsg: 'Udemy link did not appear within 10 seconds'
      });
  
      // Click on the Udemy link
      const udemyLink = await browser.$('//span[text()="Udemy"]');
      await udemyLink.click();
  });
  

  it('Step 4: Verify the Udemy site is opened', async () => {
    
    await browser.pause(2000);
    const udemyLogo = await $('img[alt="Udemy"]');
    
    // Assertion: Verify the Udemy logo is present
    assert.ok(udemyLogo.isExisting(), 'Step 4 failed: Udemy page is not opened');
});

it('Step 5: Search for BDD with Cucumber', async () => {
    
    await browser.pause(2000);
    const searchInput = await browser.$('input[data-testid="search-input"]');
    await searchInput.setValue('BDD with Cucumber');
    
    console.log("Step 5: Search for 'BDD with Cucumber'");

    // Simulate pressing the Enter key
    await searchInput.keys(['Enter']);

    await searchAndVerifyCoursePage();
});

async function searchAndVerifyCoursePage() {
  
    await browser.waitUntil(async () => {
        return (await browser.$('#challenge-stage')).isExisting();
    }, {
        timeout: 5000, 
        timeoutMsg: 'Verification process did not complete within 10 seconds' 
    });
}

it('Step 6: Click on the course with the highest rating from the list of search results', async () => {
  
  await browser.waitUntil(async () => {
      const searchResultsTitle = await $('h1[data-purpose="safely-set-inner-html:search:query"]');
      return await searchResultsTitle.isExisting();
  }, {
      timeout: 5000, 
      timeoutMsg: 'Search results page did not load within 10 seconds'
  });

  // Find all course cards
  const courseCards = await browser.$$('.course-card-module--container--3oS-F');
  let maxRating = 0;
  let maxRatingCourseIndex = -1;
  for (let i = 0; i < courseCards.length; i++) {
      const ratingElement = await courseCards[i].$('span[data-purpose="rating-number"]');
      const rating = parseFloat(await ratingElement.getText());
      if (rating > maxRating) {
          maxRating = rating;
          maxRatingCourseIndex = i;
      }
  }
  if (maxRatingCourseIndex !== -1) {
      // Click on the course with the highest rating
      await courseCards[maxRatingCourseIndex].click();
      console.log(`Step 6: Clicked on the course with the highest rating (${maxRating})`);
  } else {
      console.log('Step 6: No courses found');
  }
});

    it('Step 7: Verify the course page is opened and the course name contains "BDD with Cucumber"', async () => {
     
      await browser.pause(5000);
  
      await browser.waitUntil(async () => {
          return (await browser.getUrl()).includes('/course/');
      }, {
          timeout: 30000, 
          timeoutMsg: 'Course page did not load within 30 seconds' 
      });
  
      
      const courseTitleElement = await $('h1[data-purpose="lead-title"]');
      expect(await courseTitleElement.isExisting()).toBeTruthy();
      const courseTitle = await courseTitleElement.getText();
      const expectedCourseName = 'BDD with Cucumber';
      expect(courseTitle).toContain(expectedCourseName);
      console.log(`Step 7: Verified that the course page is opened and the course name contains "${expectedCourseName}"`);
  });
  
});
