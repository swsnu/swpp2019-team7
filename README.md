
# swpp2019-team7
[![Build Status](https://travis-ci.org/swsnu/swpp2019-team7.svg?branch=dev%2Fworking_test)](https://travis-ci.org/swsnu/swpp2019-team7)[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team7/badge.png?branch=dev/working_test&service=github)](https://coveralls.io/github/swsnu/swpp2019-team7?branch=dev/working_test&service=github)[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team7&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team7)


### Manage Your Pills Easily!

Instructions to run this app is as follows
Frontend: 

    cd frontend
    
    yarn install 
    
    yarn start
Backend:
```
    cd ../backend
    
    pip install -r ./requirements.txt
```
After that, we need to conduct an initial setup for the mysql database:
```
	bash deletemigrations.sh

	sudo systemctl start mysql

	mysql -e 'create database pillbox default character set utf8mb4 collate utf8mb4_unicode_ci'

	mysql -e 'create user jay identified by "pillbox1!"'

	sudo mysql -e 'grant all privileges on pillbox.* to jay'

	sudo mysql -e 'grant all privileges on test_pillbox.* to jay'

	sudo mysql -e 'flush privileges'

	bash makemigrations.sh

	python manage.py migrate
```
And then, we finally launch our backend:
```
	python manage.py loaddata datatset/fixtures/pill-data.json
    
   	python manage.py runserver
```

Due to security reasons we cannot upload the GCP authentication code online. Therefore, you will be unable to use the Cloud Vision API feature at this stage. 
If anyone wishes to test the product and acquire the necessary GCP authentication JSON file, please contact JinSun Yoo at `jinsun1117 at snu dot ac dot kr`
