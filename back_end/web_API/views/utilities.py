import json

def get_request_body(request):
    return json.loads(request.body)


def get_request_parameters(request):
    return request.GET