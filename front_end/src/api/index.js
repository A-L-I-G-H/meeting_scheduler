const fetch = require('node-fetch');

let poll1 = {
    id: 1,
    title: "AP delivery",
    description: "final assignment for AP. which time is better for you?",
    owner: "ahmad",
    options:[
        {id: 1, label: "tuesday 8:00", datetime: null},
        {id: 2, label: "wednesday 5:00", datetime: null},
    ],
    isFinalized: false,
    participants: ["ahmad", "zahra", "ali", "gholi"]
};

let poll2 = {
    id: 2,
    title: "DM delivery",
    description: "implementation of dijkstra",
    owner: "ahmad",
    options: [
        {id: 1, label: "tomorrow", datetime: null},
        {id: 2, label: "today", datetime: null},
    ],
    isFinalized: true,
    participants: ["kasra", "ghamar", "zahra"]
};

let poll3 = {
    id: 3,
    title: "weeklyCommittee",
    description: "weekly session for ...",
    owner: "ghasem",
    options: [
        {id: 1, label: "Saturdays", datetime: null},
        {id: 2, label: "Sundays", datetime: null},
    ],
    isFinalized: false,
    contributors: ["ali", "zahra", "ahmad"]
};

let poll4 = {
    id: 4,
    title: "itST delivery",
    description: "syntax based testing",
    owner: "borna",
    options: [
        {id: 1, label: "Friday after the ICPC contest", datetime: null},
        {id: 2, label: "Thursday", datetime: null},
    ],
    isFinalized: true,
    contributors: ["ahmad", "gholi", "ghamar"]
};

const myPolls = [poll1, poll2];

const involvedPolls = [ poll1, poll3, poll4];


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