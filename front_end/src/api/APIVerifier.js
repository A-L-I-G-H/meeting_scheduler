function hasType(obj, type) {
    if (type === "Array" || type === "array")
        return Array.isArray(obj);
    return typeof obj === type;
}


function conforms(obj, spec, message) {
    for (let prop in spec) {
        if (obj[prop] === undefined) {
            message = obj + " has no property " + prop;
            return false;
        }else if (!hasType(obj[prop],spec[prop])) {
            message = "property " + prop + " of " + obj + " is not of type " + spec[prop];
            return false;
        }
    }
    return true;
}

function conformsOrError(message, obj, spec) {
    if (!conforms(obj, spec))
        throw "non-conformance at: " + message;
}

class APIVerifier {
    verifyGetPoll(poll) {
        conformsOrError("getPoll over", poll, {
            id: "number",
            title: "string",
            owner: "string",
            options: "array",
            participants: "array",
            isFinalized: "boolean",
            finalizedOptionId: "number",
            isPeriodic: "boolean",
            periodDays: "number",
            startDate: "number",
            endDate: "number",
        });

        poll.options.forEach(option =>{
           conformsOrError("getPoll options have bad structure", option, {
               id: "number",
               label: "string",
               time: "object",
               comments: "array",
           });

            // conformsOrError("getPoll option time")
        });


    }
}



export default new APIVerifier();