coverage run --source='./' --omit='manage.py,*wsgi*,*cron*,*/dataset/*,*/test.py,*/__init__.py,*/locust.py' manage.py test --failfast
coverage report -m --omit="manage.py,*wsgi*,*cron*,*/dataset/*,*vision_api*,*/test.py,*/__init__.py,*/locust.py"
