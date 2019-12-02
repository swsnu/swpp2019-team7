#uwsgi --socket pillbox.sock --wsgi-file /home/jsyoo/swpp2019-team7/backend/backend/wsgi.py --chmod-socket=666 
uwsgi --http :8000 --wsgi-file /home/jsyoo/swpp2019-team7/backend/backend/wsgi.py
