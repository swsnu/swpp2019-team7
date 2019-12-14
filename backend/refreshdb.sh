sudo mysql -e 'drop database pillbox'
bash deletemigrations.sh
bash makedb.sh
bash makemigrations.sh
python manage.py migrate
python manage.py loaddata dataset/fixtures/pill_data.json
python manage.py createsuperuser