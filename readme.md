# ToDo Application

This application enables the user to manage his todos. A user can add new todos, mark existing ones as done once completed and then finally delete the completed ones.

## Description

### Front-end
The front-end application is a SPA written with React.
‘react-bootstrap’ has been used to design a user friendly UI. The react client app folder has been placed inside the solution folder for convenience, but it can be placed essentially anywhere for hosting.\
The front-end:
  - can read entries from the WebAPI and visualise them
  - allows editing existing entries
  - is able to add new entries
  - is able to delete existing entries


### Back-end
.NET Core WebAPI is used as the back-end written in C#. The back-end WebAPI exposes all the CRUD operations for the entity 'ToDo' as GET, POST, PUT, DELETE.\
EF Core has been used as the ORM. To persist data, the in-memory database has been used. The same can be replaced with any other RDBMS.

## Screenshot
![Screenshot-1](https://raw.githubusercontent.com/ritesh-ranga/ToDo/main/Screenshots/Screenshot_1.png)


## License
[MIT](https://choosealicense.com/licenses/mit/)
