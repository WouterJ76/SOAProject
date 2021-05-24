# django_firebase

## Quick and easy setup

```
python -m venv env
env\Scripts\activate
pip install django
pip install djangorestframework
cd project
python manage.py migrate
python manage.py runserver
```

## How to CRUD

Run the server with
```
python manage.py runserver
```

Follow the link to http://127.0.0.1:8000/dolphins/ to view all the dolphins.

### Create
* Fill in the name and characteristics of the cat on the bottom of this page
* Click the POST button to create a dolphin

### Read
* Click the link in the list of dolphins of the particular cat to see the details about a dolphin

### Update
* Click the link in the list of dolphins of the particular cat to see the details about a dolphin
* It is possible to change the name and/or characteristics of a dolphin on the bottom of this page
* Click the PUT button to update a dolphin

### Delete
* Click the link in the list of dolphins of the particular cat to see the details about a dolphin
* It is possible to delete a dolphin on the top right of this page
