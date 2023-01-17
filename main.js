let token = "b0f6756b562245e79224e22719c64173"
let cards = document.getElementById("cards")
let cardMatches = document.getElementById("card-matches")
let cardScorers = document.getElementById("card-scorers")
let tbody = document.getElementById("tbody")
function getScor(pts) {
    let tr = ""
    for (const name of pts.table) {
        tr+= `
                <tr>
                    <td><img src="${name.team.crest}" style="width: 30px;" alt=""> ${name.team.tla}</td>
                    <td>${name.won}</td>
                    <td>${name.lost}</td>
                    <td>${name.draw}</td>
                    <td>${name.points}</td>
                </tr>
        `
    }
    return tr
}
function getData() {
    axios.get("https://api.football-data.org/v4/competitions/2000/standings" , {
        headers:{
            "X-Auth-Token" : token
        }
    })
    .then(response =>{
        for (const team of response.data.standings) {
            cards.innerHTML += `
            <div class="card">
                    <h3>${team.group}</h3>
                    <table>
                        <tr>
                            <td>team</td>
                            <td>W</td>
                            <td>L</td>
                            <td>D</td>
                            <td>Pts</td>
                        </tr>
                        ${getScor(team)}
                    </table>
                </div>
            `
        }
    })
}
// groups
getData()
// matches
function getMatches(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    axios.get("https://api.football-data.org/v4/competitions/2000/matches" , 
     {
        headers : {
            "X-Auth-Token": "b0f6756b562245e79224e22719c64173"
        }
     }
    )
    .then(response =>{
        for (const re of response.data.matches) {
            
            if (re.homeTeam.name != null && re.utcDate.substring(0, 10) == today) {
                cardMatches.innerHTML += `<div class="row">
                <div class="col">
                        <div class="flag"><img src="${re.awayTeam.crest}" style="" alt=""></div>
                        <div class="team-name"><p>${re.awayTeam.tla}</p></div>
                    </div>
                    <div class="col" style="display: grid;
                                            grid-template-columns: 30% 40% 30%;
                                            background-color: white;
                                            border-radius: 10px;
                                            align-items: center;
                                            height: 70px;
                                            color: black;
                                            clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);">
                        <div class="resault1"><p>${re.score.fullTime.away ?? "-"}</p></div>
                        <div class="vs"><p style="font-size: 34px;"><p>${re.group}</p>vs</p><p>${re.utcDate}</p></div>
                        <div class="result2"><p>${re.score.fullTime.home ?? "-"}</p></div>
                    </div>
                    <div class="col">
                        <div class="flag"><img src="${re.homeTeam.crest}"  alt=""></div>
                        <div class="team-name"><p>${re.homeTeam.tla}</p></div>
                    </div>
                </div>`
            }
        }
    }
    )
}
getMatches()           
function scorers(){
    axios.get("http://api.football-data.org/v4/competitions/2000/scorers" ,
        {
            headers :{
                'X-Auth-Token': "b0f6756b562245e79224e22719c64173"
            }
        }
    )
    .then(response =>{
        for (const res of response.data.scorers) {
            tbody.innerHTML += `
                    <tr>
                        <td>${res.player.name}</td>
                        <td>${res.player.nationality}</td>
                        <td>${res.player.position}</td>
                        <td>${res.goals}</td>
                    </tr>
            `
        }
    })
}
scorers()