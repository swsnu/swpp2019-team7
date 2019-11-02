coverage run --source='./' --omit='manage.py, *wsgi*' manage.py test 
coverage report -m
