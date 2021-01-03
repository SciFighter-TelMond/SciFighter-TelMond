const team_data_element = document.getElementById("team_data");


const firebaseConfig = {
    apiKey: "AIzaSyDVHiuaLKCWdGeYbUXP91eTk-KdfXcTWoM",
    authDomain: "ftc-scouting-server.firebaseapp.com",
    databaseURL: "https://ftc-scouting-server.firebaseio.com",
    projectId: "ftc-scouting-server",
    storageBucket: "ftc-scouting-server.appspot.com",
    messagingSenderId: "663608987721",
    appId: "1:663608987721:web:7259ed3828ab2a9fcd2f98",
    measurementId: "G-9H1YQYYKBG"
};

firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.database();
const headers = firebaseDB.ref("headers");
const db = firebaseDB.ref("teams");

const headersData = {
    teamName : "Team Name",
    teamNumber : "Team Number",
    teamTest : "Team Test",

    a_wobble: "Autonomous \nWobble",
    a_parkingLaunchLine: "Autonomous \nParking Launch Line",
    a_lowGoal: "Autonomous \nLow Goal",
    a_mediumGoal: "Autonomous \nMedium Goal",
    a_highGoal: "Autonomous \nHigh Goal",
    a_powershot: "Autonomous \nNumber of Powershots",
    a_penalty: "Autonomous \nPenalty",
    
    t_lowGoal: "TeleOp \nLow Goal",
    t_mediumGoal: "TeleOp \nMedium Goal",
    t_highGoal: "TeleOp \nHigh Goal",
    t_lowGoalAccuracy: "TeleOp \n Low Goal Accuracy",
    t_mediumGoalAccuracy: "TeleOp \n Medium Goal Accuracy",
    t_highGoalAccuracy: "TeleOp \n High Goal Accuracy",
    t_penalty: "TeleOp \nPenalty",

    e_Powershot: "Endgame \nNumber of Powershot",
    e_ringsOnWobble: "Endgame \nRings on Wobble",
    e_wobbleDropzone: "Endgame \nWobble Dropzone",
    e_penalty: "Endgame \nPenalty",

    score : "Score"
};
// headers.once("value",
//     (data) => {
//         headersData = data.val();
//     },
//     (err) => {
//         if (err) throw err;
//     }
// );

db.on("value",
    (data) => {
        // #region clear the Table
        while (team_data_element.firstChild) {
            team_data_element.removeChild(team_data_element.lastChild);
        }
        // #endregion

        // #region add the headers
        const headers_row = document.createElement("tr");
        for (const [key, value] of Object.entries(headersData)) {
            const th = document.createElement("th");
            th.classList.add("headers");
            th.innerText = value;
            headers_row.appendChild(th);
        }
        team_data_element.appendChild(headers_row);
        // #endregion

        // #region add the actual data
        // for every team entry
        for (const [id, teamData] of Object.entries(data.val())) {
            const tr = document.createElement("tr");
            // for every header
            for (const [info, _] of Object.entries(headersData)) {
                const td = document.createElement("td");
                td.innerText = teamData[info];
                if (td.innerText == "undefined") {
                    td.classList.add("undefined");
                }
                tr.appendChild(td);
            }
            team_data_element.appendChild(tr);
        }
        // #endregion
    },
    (err) => {
        if (err) throw err;
    }
);