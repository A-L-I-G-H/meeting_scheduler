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
        return renameProps(poll, [
            ['creator__username', 'owner'],
            ['finalized_option_id', 'finalizedOptionId'],
            ['is_finalize', 'isFinalized'],
        ]);
    }
}




