CREATE DATABASE friends_db;
USE friends_db;
create table people(
	id INT not null primary key auto_increment,
	name VARCHAR(50) NOT NULL,
    photo VARCHAR(255) NOT NULL
);
create table scores(
	id int not null primary key auto_increment,
    first int,
    second int,
    third int,
    fourth int,
    fifth int,
    sixth int,
    seventh int,
    eighth int,
    ninth int,
    tenth int
);
