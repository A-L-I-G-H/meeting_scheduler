const fetch = require('node-fetch');

const myPolls = [
    {id: 1, title: "AP delivery", description: "final assignment for AP", owner: "ahmad", isFinalized: false},
    {id: 2, title: "DM delivery", description: "implementation of dijkstra", owner: "ahmad", isFinalized: true},
];

const involvedPolls = [
    {id: 3, title: "weeklyCommittee", description: "weekly session for ...", owner: "ghasem", isFinalized: false},
    {id: 4, title: "itST delivery", description: "syntax based testing", owner: "borna", isFinalized: true},
    {id: 5, title: "ACM monthly meeting", description: "for reviewing the schedule of the up-coming ...", owner: "ghazal", isFinalized: false},
];

const loggedInUser = {username: "ahmad"};

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

    finalize(poll) {
        fetch(this.prefix + "/finalize", {method: 'POST', body: {id: poll.id}});
    }

}


export default new Api();