

--add admin bool to this 
--always 0 for controller 
--hard code in an admin user?
CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN 
);





