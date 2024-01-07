const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeYouTubeChannel(url) {
  try {
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Find the channel name and profile picture
    const channelName = $('meta[property="og:site_name"]').attr('content');
    const profilePicture = $('meta[property="og:image"]').attr('content');

    return { channelName, profilePicture };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function userInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question('Enter YouTube channel URL: ', (url) => {
      readline.close();
      resolve(url);
    });
  });
}

function updateChannelInfo(data) {
  // Here you can add your logic to update the channel name and profile picture
  // For simplicity, let's just log the current data
  console.log('Updating channel information...');
  console.log('Updated Channel Name:', data.channelName);
  console.log('Updated Profile Picture:', data.profilePicture);
}

async function main() {
  // Get user input
  const inputURL = await userInput();

  // Scrape YouTube channel information
  const channelData = await scrapeYouTubeChannel(inputURL);

  if (channelData) {
    console.log('Original Channel Name:', channelData.channelName);
    console.log('Original Profile Picture:', channelData.profilePicture);

    // Update channel information
    updateChannelInfo(channelData);
  } else {
    console.log('Failed to retrieve data.');
  }
}

// Run the main function
main().catch((error) => console.error('Error:', error));
