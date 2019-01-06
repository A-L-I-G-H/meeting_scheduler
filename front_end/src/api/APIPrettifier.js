function renameProps(obj, renameList) {
    for (let prop in obj) {
        if (!obj.hasOwnProperty(prop))
            continue;

        // console.log("checking prop: ", prop);
        let renameItem = renameList.find(renameItem => renameItem[0] === prop);

        if (renameItem !== undefined) {
            // console.log("found matching rename: ", renameItem);
            obj[renameItem[1]] = obj[renameItem[0]];
            delete obj[renameItem[0]];
        } else {
          // console.log("no matching rename found");
        }
    }
    return obj;
}


class APIPrettifier {
    prettifyGetPoll(poll) {
        let result = renameProps(poll, [
            ['creator__username', 'owner'],
            ['finalized_option_id', 'finalizedOptionId'],
            ['is_finalized', 'isFinalized'],
        ]);

        result.options.forEach(option => {
           option = renameProps(option, [
              ['date_time', 'time']
           ]);

           option.comments.forEach(comment => {
               comment = renameProps(comment, [
                   ['user__username', 'writer'],
                   ['text', 'content'],
                   ['reply_id', 'repliedToId']
               ]);
               comment.isReply = comment.repliedToId !== null;
           });
        });

        console.log("prettified poll:");
        console.log(poll);

        return result;
    }


    prettifyOwnerPolls(polls) {
        // console.log("prettifying", polls);
        return polls.map(poll => (
            renameProps(poll, [
                ['is_finalized', 'isFinalized']
            ])
        ));
    }

    prettifyInvolvedPolls(polls) {
        // console.log("prettifying involved:", polls);
        let result = polls.map(poll => renameProps(poll, [
            ['event_poll__id', 'id'],
            ['event_poll__title', 'title'],
            ['event_poll__description', 'description'],
            ['event_poll__is_finalized', 'isFinalized'],
        ]));
        // console.log("pretty result:", result);
        return result;
    }





}


export default new APIPrettifier();

