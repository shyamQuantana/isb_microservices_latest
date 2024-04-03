const readline = require('readline');
const EmailTemplates = require('./email_templates.js');
// Create interface for reading input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to execute when "first" is entered
async function firstFunction(participantName, learningTrack, startDate)  {
  let response = await EmailTemplates.getUserEnrolmentEmailTemplate(participantName, learningTrack, startDate);
  console.log("enrollment participant", response);
  // Write your logic for the first function here
}

// Function to execute when "second" is entered
function secondFunction() {
  console.log("payment reminder emails");
  // Write your logic for the second function here
}

// Function to handle user input
function handleInput(input) {
  // Trim input to remove any trailing spaces
  input = input.trim().toLowerCase();

  // Execute function based on user input
  if (input === 'enrollment_email') {
    // Prompt user for participant name, learning track, and start date
    rl.question("Enter participant name: ", (participantName) => {
      rl.question("Enter learning track name: ", (learningTrack) => {
        rl.question("Enter program start date (DD-MM-YYYY): ", (startDate) => {
          // Call firstFunction with user inputs
          firstFunction(participantName, learningTrack, startDate);
          // Close readline interface
          rl.close();
        });
      });
    });
  } else if (input === 'payment_reminder_email') {
    secondFunction();
    // Close readline interface
    rl.close();
  } else {
    console.log("Invalid input. Please enter 'enrollment email' or 'payment reminder'.");
    // Close readline interface
    rl.close();
  }
}

// Ask for user input
rl.question("Enter 'enrollment_email' or 'payment_reminder_email': ", handleInput);
