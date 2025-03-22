// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];
function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    let isAssignmentInCourse = checkAgInCourse(course, ag); // to check if the assignment group is in course
    try {
        if (isAssignmentInCourse) {
            console.log("Assignment group belongs to this course!")
            let learners = getLearnersData(ag, submissions)
            console.log(JSON.stringify(learners, 0, 2));
            return checkDueSubmitted(learners);
        }
        else
            throw new Error("Assignment group doesn't belong to this course!!!");
    }
    catch (error) {
        let errMessage = error.message;
        return errMessage;
    }
}

function checkAgInCourse(course, ag) { //Checks if the assignment group belongs to the course
    return course.id == ag.course_id
}
function getLearnersData(ag, submissions) { //get learners necessary data
    let learners = []; //create a new learners object 
    submissions.forEach(SubmissionData => { //looping through LearnerSubmissions
        let learnerId = SubmissionData.learner_id;
        let learner = null;
        for (let i = 0; i < learners.length; i++) {
            if (learners[i].learnerId == learnerId) {
                learner = learners[i];
                break;
            }
        }
        if (!learner) {
            learner = {
                learnerId: learnerId,
                assignments: {}
            }
            learners.push(learner);
        }
        let assignmentId = SubmissionData.assignment_id;
        for (let i = 0; i < ag.assignments.length; i++) //looping through assignment group to check for every assignment present in LearnerSubmissions, 
        // we get the learners full data needed for further manipulation
        {
            if (assignmentId == ag.assignments[i].id) { // checking if the assignment ids are same
                learner.assignments[assignmentId] = {
                    points_possible: ag.assignments[i].points_possible,
                    due_at: ag.assignments[i].due_at,
                    score: SubmissionData.submission.score,
                    submitted_at: SubmissionData.submission.submitted_at
                }
            }
        }
    });
    return learners;
}
function calculateTotalPoints(isSubmittedBefore, assignmentId, learners) {
    let assignmentScore = 0;
    let pointsPossible = learners.assignments[assignmentId].points_possible;
    let score = learners.assignments[assignmentId].score;
    if (isSubmittedBefore == true) {
        assignmentScore = score / pointsPossible;
        return assignmentScore;
    }
    else {
        assignmentScore = ((score / pointsPossible) - 0.1);
        return assignmentScore;
    }
}


function checkDueSubmitted(array) {
    let learnersFullData = [];
    let dueAt = "";
    let submittedAt = "";

    for (let i = 0; i < array.length; i++) {
        let weightedScore = 0;
        let assignmentCount = 0;
        let assignmentScore = 0;
        let isSubmittedBefore = false;
        learnersFullData[i] = { id: array[i].learnerId, avg: null}
        for (let assignmentId in array[i].assignments) {
            console.log(assignmentId);
            let assignment = array[i].assignments[assignmentId];
            dueAt = Date.parse(assignment.due_at);
            submittedAt = Date.parse(assignment.submitted_at);
            if (dueAt < Date.now()) {
                if (submittedAt <= dueAt) {
                    isSubmittedBefore = true;
                }
                assignmentScore = calculateTotalPoints(isSubmittedBefore, assignmentId, array[i]);
                learnersFullData[i][assignmentId] = assignmentScore;
                isSubmittedBefore = false;
                assignmentCount++;
                weightedScore += assignmentScore;
            }
        }
        weightedScore = weightedScore / assignmentCount;
        learnersFullData[i].avg = weightedScore;

        
    }
    //console.log(`Weighted score of ${array[i].learnerId} is ${weightedScore}`);
    return learnersFullData;
}

result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
