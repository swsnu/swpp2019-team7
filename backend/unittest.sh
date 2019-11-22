coverage run --source='./' --omit='manage.py, *wsgi*, cron.py' manage.py test 
coverage report -m
