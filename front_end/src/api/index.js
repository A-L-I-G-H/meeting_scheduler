const fetch = require('node-fetch');

const myPolls = [
    {
        id: 1, title: "AP delivery", description: "final assignment for AP. which time is better for you?", owner: "ahmad",
        options:["tuesday 8:00", "wednesday 5:00"], isFinalized: false, participants: ["ahmad", "zahra", "ali", "gholi"]
    },
    {
        id: 2, title: "DM delivery", description: "implementation of dijkstra", owner: "ahmad",
        options: ["tomorrow", "today"], isFinalized: true, participants: ["kasra", "ghamar", "zahra"]
    },
];

const involvedPolls = [
    {
        id: 3, title: "weeklyCommittee", description: "weekly session for ...", owner: "ghasem",
        options: ["Saturdays", "Sundays"], isFinalized: false, contributors: ["ali", "zahra", "ahmad"]
    },
    {
        id: 4, title: "itST delivery", description: "syntax based testing", owner: "borna",
        options: ["Friday after the ICPC contest", "Thursday"], isFinalized: true, contributors: ["ahmad", "gholi", "ghamar"]
    },
    // {id: 5, title: "ACM monthly meeting", description: "for reviewing the schedule of the up-coming ...", owner: "ghazal", options:["today", "tomorrow"], isFinalized: false},
];


class Api {
    prefix = "http://localhost:8000";

    createPoll(poll) {
        console.log("sending request to /createPoll with : ");
        console.log(poll);
        fetch(this.prefix + "/createPoll", {method: 'POST', body: poll});
    }

    getMyPolls() {
        return myPolls;
    }

    getInvolvedPolls() {
        return involvedPolls;
    }

    async getPoll(id) {
        let allPolls = myPolls.concat(involvedPolls);
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve(allPolls.find(poll => poll.id === id));
           }, 1000);
        });
    }

    finalize(poll) {
        fetch(this.prefix + "/finalize", {method: 'POST', body: {id: poll.id}});
    }

}


export default new Api();