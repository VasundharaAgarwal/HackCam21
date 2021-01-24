release: python manage.py makemigrations --no-input
release: python manage.py migrate --no-input
web: gunicorn farmer_api.wsgi --log-file -
