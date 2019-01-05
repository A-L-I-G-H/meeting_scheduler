import {VoteType} from "../globals";
import fetch from 'node-fetch';
const {URLSearchParams} = require('url');

let poll1 = {
    id: 1,
    title: "AP delivery",
    description: "final assignment for AP. which time is better for you?",
    owner: "ahmad",
    options:[
        {
            id: 1,
            label: "tuesday 8:00",
            datetime: null,
            comments: [
                {id: 0, content: "a small comment", writer: "saeed", isReply: false},
                {id: 1, content: "a bigger comment, which needs some extra stuff to fill the screen.", writer: "mehdi", isReply: false},
                {id: 2, content: "reply to small comment", writer: "ahmad", isReply: true, repliedToId: 0},
                {id: 3, content: "reply to reply to small comment", writer: "zahra", isReply: true, repliedToId: 2},
            ]
        },
        {id: 2, label: "wednesday 5:00", datetime: null, comments: []},
        {id: 3, label: "friday 10:00", datetime: null, comments: []},
    ],
    isFinalized: true,
    finalizedOptionId: 2,
    participants: [
        {username: "ahmad", voted: false},
        {username: "zahra", voted: true, votes: [{optionId: 1, voteType: VoteType.No}, {optionId: 2, voteType: VoteType.Yes}, {optionId: 3, voteType: VoteType.YesIfNecessary}]}
    ],
};

let poll2 = {
    id: 2,
    title: "DM delivery",
    description: "implementation of dijkstra",
    owner: "kasra",
    options: [
        {id: 1, label: "tomorrow", datetime: null, comments: []},
        {id: 2, label: "today", datetime: null, comments: []},
    ],
    isFinalized: true,
    finalizedOptionId: 2,
    participants: [
        {username: "ahmad", voted: false},
        {username: "kasra", voted: true, votes: [{optionId: 1, voteType: VoteType.YesIfNecessary}, {optionId: 2, voteType: VoteType.No}]},
    ],
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
    participants : []
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
    isFinalized: false,
    participants: [],
};

let myPolls = [poll1, poll2];
let involvedPolls = [poll3, poll1, poll4];
let allPolls = [poll1, poll2, poll3, poll4];

let collisions = [
    [],
    [{optionLabel: 'wednesday 6:00', pollTitle: 'DM delivery'}],
    [],
    [{optionLabel: 'tuesday 9:00', pollTitle: 'ACM session'}, {optionLabel: 'tuesday 7:00', pollTitle: 'DM delivery'}],
];


let commentIdCounter = 10;

class Api {
    prefix = "http://localhost:8000";

    createPoll(poll) {
        console.log("sending request to /createPoll with : ");
        console.log(poll);
        fetch(this.prefix + "/createPoll", {method: 'POST'});
    }

    getMyPolls() {
        return myPolls;
    }

    getInvolvedPolls() {
        return involvedPolls;
    }

    async getPoll(id) {
        // let allPolls = myPolls.concat(involvedPolls);

        // return new Promise((resolve, reject) => {
        //    setTimeout(() => {
        //        resolve(allPolls.find(poll => poll.id === id));
        //    }, 1000);
        // });

        return fetch(this.prefix + "/polls?id=" + id)
            .then(result => result.json())
            .then(json => console.log("json:", json));
    }

    finalize(poll, optionId) {
        // let response = fetch(this.prefix + "/finalize/", {method: 'PUT', body: {id: poll.id}});

        //temporary:
        let targetpoll = allPolls.find(searchedPoll => searchedPoll.id === poll.id);
        targetpoll.isFinalized = true;
        targetpoll.finalizedOptionId = optionId;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    vote(username, pollId, votes) {
        let poll = allPolls.find(poll => poll.id === pollId);
        let participant = poll.participants.find(participant => participant.username === username);
        participant.voted = true;
        participant.votes = votes;
        console.log("setting votes to:");
        console.log(votes);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true, );
            }, 500);
        });
    }


    createPoll(creatorUsername, poll) {
        return new Promise((resolve, reject) => {
           setTimeout(() => {
               resolve(true);
           }, 1000);
        });
    }

    post(comment) {
        commentIdCounter++;
        return new Promise(resolve => {
            setTimeout(() => resolve([true, commentIdCounter]), 1000);
        });
    }

    reopen(poll) {
        let mockPoll = allPolls.find(each => each.id === poll.id);

        mockPoll.isFinalized = false;
        delete mockPoll.finalizedOptionId;

        return new Promise(resolve => {
           setTimeout(() => resolve(true), 1000);
        });
    }

    checkCollision(option) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(collisions[option.id])
            }, 500);
        });
    }


}


export default new Api();