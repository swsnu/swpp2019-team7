# pylint: skip-file
from locust import HttpLocust, TaskSet, task 


class LoadTask(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass

    @task
    def index_page(self):
        self.client.get('/')
   

class WebsiteUser(HttpLocust):
    task_set = LoadTask
    wait_time = betweeen(3,8)
    

"""
def create_item(request):
    if request.method == 'GET':
        charset = string.ascii_letters + string.digits
        random_name = ''.join(random.choices(charset, k=20))

        Item.objects.create(name=random_name)

        return HttpResponse('OK')
    else:
        return HttpResponseNotAllowed(['GET']) 
"""