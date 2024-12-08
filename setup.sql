

--add admin bool to this 
--always 0 for controller 
--hard code in an admin user? 
--actuallyt just making one normally than modifying it will be easier (hash will be weird if putting it in manually)
CREATE TABLE users (
  userID SERIAL PRIMARY KEY,
  username VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  reset_token VARCHAR(128),
  reset_token_expires TIMESTAMP
);

CREATE TABLE products (
  productID SERIAL PRIMARY KEY, 
  name VARCHAR(32) UNIQUE NOT NULL, 
  description VARCHAR(256) NOT NULL, 
  price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE carts (
  userID INTEGER NOT NULL,
  productID INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  engravingText VARCHAR(64),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (productID) REFERENCES products(productID)
);

CREATE TABLE tags (
  tagID SERIAL PRIMARY KEY,
  tagText VARCHAR(255) NOT NULl
);

CREATE TABLE productTags (
  productID INTEGER NOT NULL,
  tagID INTEGER NOT NULL,
  FOREIGN KEY (productID) REFERENCES products(productID),
  FOREIGN KEY (tagID) REFERENCES tags(tagID)
);

CREATE TABLE images (
  fileName VARCHAR(255) PRIMARY KEY,
  altDescription VARCHAR(255),
  productID INTEGER NOT NULL,
  FOREIGN KEY (productID) REFERENCES products(productID)
);

INSERT INTO products (name, description, price)
VALUES
  ('Poker Table', 'It is a poker table. For playing poker', 99.99), 
  ('Poker Chips', 'They are poker chips. For hitting it big. Set of 100', 19.99),
  ('Cards', 'They are cards. For playing cards', 7.32),
  ('Roulette Wheel', 'Classic casino roulette wheel with ball', 129.99),
  ('Dice Set', 'Set of 6 standard casino dice', 5.49),
  ('Craps Table', 'Professional craps table for high stakes', 499.99),
  ('Slot Machine', 'Fully functional slot machine for personal use', 899.00),
  ('Blackjack Table', 'Blackjack table with card holder and chip tray', 149.99),
  ('Dealer Shoe', 'Multi-deck card dealer shoe for blackjack', 39.99),
  ('Shuffler', 'Automatic card shuffler for up to 6 decks', 34.99),
  ('Casino Chair', 'Ergonomic casino chair for comfortable gaming', 79.99),
  ('Keno Balls', 'Set of numbered Keno balls, 1-80', 19.99); 

INSERT INTO images (fileName, altDescription, productID)
VALUES  
  ('pokerTable1.png', 'poker table picture', 1), 
  ('pokerTable2.png', 'poker table picture', 1), 
  ('pokerTable3.png', 'poker table picture', 1), 
  ('chips1.png', 'chips picture', 2), 
  ('chips2.png', 'chips picture', 2),
  ('chips3.png', 'chips picture', 2), 
  ('cards1.png', 'cards picture', 3), 
  ('cards2.png', 'cards picture', 3), 
  ('cards3.png', 'cards picture', 3), 
  ('wheel1.png', 'wheel picture', 4), 
  ('wheel2.png', 'wheel picture', 4), 
  ('wheel3.png', 'wheel picture', 4), 
  ('dice1.png', 'dice picture', 5),
  ('dice2.png', 'dice picture', 5),
  ('dice3.png', 'dice picture', 5),
  ('craps1.png', 'craps picture', 6),
  ('craps2.png', 'craps picture', 6),
  ('craps3.png', 'craps picture', 6),
  ('slotMachine1.png', 'slot machine picture', 7),
  ('slotMachine2.png', 'slot machine picture', 7),
  ('slotMachine3.png', 'slot machine picture', 7),
  ('blackjack1.png', 'blackjack table', 8),
  ('blackjack2.png', 'blackjack table', 8),
  ('blackjack3.png', 'blackjack table', 8),
  ('cardShoe1.png', 'card shoe picture', 9), 
  ('cardShoe2.png', 'card shoe picture', 9), 
  ('cardShoe3.png', 'card shoe picture', 9), 
  ('cardShuffler1.png', 'card shuffler picture', 10),
  ('cardShuffler2.png', 'card shuffler picture', 10),
  ('cardShuffler3.png', 'card shuffler picture', 10),
  ('chair1.png', 'chair picture', 11), 
  ('chair2.png', 'chair picture', 11), 
  ('chair3.png', 'chair picture', 11), 
  ('bingoBalls1.png', 'bingo balls picture', 12),
  ('bingoBalls2.png', 'bingo balls picture', 12),
  ('bingoBalls3.png', 'bingo balls picture', 12);


--assuming product table created like schema 



  






