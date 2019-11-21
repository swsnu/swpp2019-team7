coverage run --source='./' --omit='manage.py,*wsgi*,*cron*,*/dataset/*' manage.py test 
coverage report -m --omit="manage.py,*wsgi*,*cron*,*/dataset/*,*vision_api*"
