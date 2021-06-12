# Django Project

## Quick and easy setup

```
python -m venv env
env\Scripts\activate
pip install django
pip install djangorestframework
pip install django-cors-headers
cd project
python manage.py migrate
python manage.py runserver
```

## How to CRUD

Run the server with
```
python manage.py runserver
```

Follow the link to http://127.0.0.1:8000/cats/ to view all the cats.

### Create
* Fill in the name and characteristics of the cat on the bottom of this page
* Click the POST button to create a cat

### Read
* Click the link in the list of cats of the particular cat to see the details about a cat

### Update
* Click the link in the list of cats of the particular cat to see the details about a cat
* It is possible to change the name and/or characteristics of a cat on the bottom of this page
* Click the PUT button to update a cat

### Delete
* Click the link in the list of cats of the particular cat to see the details about a cat
* It is possible to delete a cat on the top right of this page
