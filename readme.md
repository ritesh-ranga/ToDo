# ToDo Application

This is a web application for managing ToDos.

## Description

### Front-end
The front-end application is a SPA written with React.
'react-bootstrap' has been used to make UI user-friendly.
The front-end:
  - can read entries from the WebAPI and visualise them
  - allows editing existing entries
  - is able to add new entries
  - is able to delete existing entries


### Back-end
.NET Core WebAPI is used as the back-end written in C#. The WebAPI exposes CRUD operations for the entity 'ToDo'. 
EF Core has been used as the ORM and the in-memory database has been used to persist the data.


## License
[MIT](https://choosealicense.com/licenses/mit/)