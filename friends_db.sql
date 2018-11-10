drop database if exists friends_db;
CREATE DATABASE friends_db;
USE friends_db;
drop table if exists people;
create table people(
	id INT not null primary key auto_increment,
	name VARCHAR(50) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    scores VARCHAR(20) NOT NULL
);
drop table if exists scores;

insert into people(name, photo, scores)
values ("name","https://via.placeholder.com/150","1,2,3,4,5,5,4,3,2,1"),
		("name2","photo2","5,4,3,2,1,1,2,3,4,5");

select people.name, people.photo, people.scores
from people;