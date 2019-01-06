function renameProps(obj, renameList) {
    for (let prop in obj) {
        if (!obj.hasOwnProperty(prop))
            continue;

        let renameItem = renameList.find(renameItem => renameItem[0] === prop);
        if (renameItem !== undefined) {
            obj[renameItem[1]] = obj[renameItem[0]];
            delete obj[renameItem[0]];
        }
    }
    return obj;
}


class APIPrettifier {
    prettifyGetPoll(poll) {
        let result = renameProps(poll, [
            ['creator__username', 'owner'],
            ['finalized_option_id', 'finalizedOptionId'],
            ['is_finalize', 'isFinalized'],
        ]);

        result.options.forEach(option => {
           option = renameProps(option, [
              ['date_time', 'time']
           ]);
        });
    }

    prettifyOwnerPolls(polls) {
        console.log("prettifying", polls);
        return polls.map(poll => (
            renameProps(poll, [
                ['is_finalized', 'isFinalized']
            ])
        ));
    }

    prettifyInvolvedPoll(poll) {
        return renameProps(poll, [
            ['event_poll__id', 'id'],
            ['event_poll_title', 'title'],
            ['event_poll_description', 'description'],
            ['event_poll_is_finalized', 'isFinalized'],
        ]);
    }





}


export default new APIPrettifier();

