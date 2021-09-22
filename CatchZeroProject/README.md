Catch Zero:
Let’s build a mobile app game to rate your mindfulness and concentration. A random
number displayed on your screen to respond for some time duration, where you will
have respective scores for correct & incorrect clicks on the number.

This game will require you to use a random number generation to display a number on
the screen. Please follow the rules and guidelines mentioned below.

Game rules
     ● Duration of the game must be 2 mins (120 seconds).
     ● Random numbers are generated between only 0 to 5 (0,1,2,3,4,5).
     ● Every number must be displayed on the screen for two seconds. Then there
        must be one second break time between every number (where you can show a
        blank screen instead of numbers). For example, For input of 3,0,5, ...

        To Display     Duration (Sec)
                3      |         2
                1      |
                0      |         2
                1      |
                5      |         2
                1      |               
      ● Users must be able to click on the number displayed on the screen and it will
        update your score (instructed below),
            ★ For clicking on zero, you will get 5 points
            ★ For clicking non-zero, you will get -2.5 points
            ★ For Skipping 0 (missed to click on 0), you will get -3 points
            ★ For Skipping non-zero, you will get 1 point
      ● A count-down timer must displayed on the screen below numbers (Refer
         wireframe)

Wireframe & Flow
      ● On pressing the start button, it must initiate generating a random number to
         display (for 2 sec) and intermediate breaks (for 1 sec) between each number.
      ● Users can click on each number display on screen.
      ● A live score is displayed in the top left corner. Initial score will be 0.
      ● The live score flashes on red if the user clicks on the wrong number (clicking
         non-zero number).
      ● For example, now live score is 15 and if user clicks on zero then score will be 20,
         then user clicks on ‘5’ (Non-Zero) number then it will be 17.
      ● When the game gets over the result is displayed in the screen as follows
           ○ Over-all score
           ○ Number of characters displayed
           ○ Number of 0’s displayed
           ○ Count of Zero & Non-Zero clicked
           ○ Count of Skipped Zero & Non-Zero
           
Guidelines
      ● WewouldlikeyoutoimplementtherandomnumbergeneratorontheNative
        (either iOS / Android) side, passing the data back to the React side.
      ● Well & optimized good standards.
      ● Latest react concepts and good unit test coverage are a bonus
      ● Please make a video of the app working and submit it with the code.
      ● Duration to complete 1-2 days