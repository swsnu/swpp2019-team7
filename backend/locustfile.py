from locust import HttpLocust, TaskSet, TaskSet
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
    min_wait = 3000
    max_wait = 8000