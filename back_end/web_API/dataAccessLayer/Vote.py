from web_API.models.ParticipantsVotes import ParticipantsVotes

class Vote:

    @staticmethod
    def vote(vote_info):
        print(vote_info)
        vote_objects = ParticipantsVotes.objects.filter(event_poll__id= vote_info['pollId'],
                                                        user__username= vote_info['username'],
                                                        event_poll__is_finalized= False)



        print(vote_objects)
        for vote in vote_info['votes']:
            vote_object = vote_objects.filter(option__id= vote['optionId'])[0]
            vote_object.vote_type = vote['voteType']
            vote_object.save()

        return {"OK": True}