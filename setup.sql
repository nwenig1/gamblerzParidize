

--add admin bool to this 
--always 0 for controller 
--hard code in an admin user?
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
--assuming product table created like schema 

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
  ('Chip Case', 'Aluminum poker chip carrying case, holds 500 chips', 24.99),
  ('Shuffler', 'Automatic card shuffler for up to 6 decks', 34.99),
  ('Betting Chips', 'High-quality betting chips, assorted colors, set of 200', 59.99),
  ('Croupier Stick', 'Croupier stick for managing bets on roulette tables', 14.99),
  ('Casino Chair', 'Ergonomic casino chair for comfortable gaming', 79.99),
  ('Felt Layout', 'Casino-grade felt layout for various games', 29.99),
  ('Baccarat Shoe', 'Professional baccarat shoe for dealing cards', 49.99),
  ('Keno Balls', 'Set of numbered Keno balls, 1-80', 19.99),
  ('Roulette Chips', 'Non-denominated roulette chips, set of 100', 39.99);






