This program processes and analyzes student assignment data. 
Based on the data, it will calculate each student's average score, and also provide scores for each individual assignment they completed.
This is acheived with the following functions. 
**getLearnerData()** - Checks if the assignment group belongs to the course using the **checkAgInCourse()** function.If the assignment group belongs to the course, it gathers the necessary data for each student by calling the **getLearnersData()** function. 
Then it processes the due and submission dates using the **checkDueSubmitted()** function to calculate the scores.
**checkAgInCourse()** -  checks the assignment group is part of the specified course.
**calculateTotalPoints()** -  Calculates the score percentage for each assignment.
Key things to be noted are , If an assignment is submitted late, it gets a 10% penalty (10% of the assignment’s points).
and the final average for each student is weighted based on the total points possible for each assignment.

**What would you add to, or change about your application if given more time?**
  Could have made the code more DRY. Could have added more functional/non functional requirements like checking for wrong data.

**What could you have done differently during the planning stages of your project to make the execution easier?**
  Could have tried to understand the requirements thoroughly before starting to code.
