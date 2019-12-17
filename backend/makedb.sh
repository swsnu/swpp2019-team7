sudo mysql -e 'create database pillbox default character set utf8mb4 collate utf8mb4_unicode_ci'

sudo mysql -e 'grant all privileges on pillbox.* to jay'

sudo mysql -e 'grant all privileges on test_pillbox.* to jay'

sudo mysql -e 'flush privileges'

