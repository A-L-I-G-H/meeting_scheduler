import json

def parse_request(request):
    request_body = json.loads(request.body)
    return request_body