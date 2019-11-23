coverage run --source='./' --omit='manage.py,*wsgi*,*cron*,*/dataset/*,*/test.py,*/__init__.py' manage.py test
coverage report -m --omit="manage.py,*wsgi*,*cron*,*/dataset/*,*vision_api*,*/test.py,*/__init__.py"
