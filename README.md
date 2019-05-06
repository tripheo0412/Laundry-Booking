# Laundry-Booking
<br>
A Full Stack Laundry Booking Service 
<br>
# List of API used
----------------

#### Auth API

-   '/auth/login' - POST - authenticating with jwt

-   '/auth/register' - POST - create new user from FormData

#### Booking API

-   '/booking/new' - POST - create new booking

-   '/booking/all' - GET - get all booking

#### Machine API

-   '/machine' - GET - get all machines

-   '/machine' - POST - create new machine

-   '/machine/:id' - DELETE - delete machine by id

#### Message API

-   '/messages' - GET - get all messages

-   '/messages/:user' - GET - get all user's messages

-   '/messages/' - POST - create new messages

#### User API

-   '/user' - GET - get all user

-   '/user/user/:email' - GET - get user by email
