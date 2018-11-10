drop database if exists friends_db;
CREATE DATABASE friends_db;
USE friends_db;
drop table if exists people;
create table people(
	id INT not null primary key auto_increment,
	name VARCHAR(50) NOT NULL,
    photo VARCHAR(255) NOT NULL
);
drop table if exists scores;
create table scores(
	id int not null primary key auto_increment,
    q1 int,
    q2 int,
    q3 int,
    q4 int,
    q5 int,
    q6 int,
    q7 int,
    q8 int,
    q9 int,
    q10 int
);

insert into people(name, photo)
values ("name","photoHTMLFIRST"),
		("name2","photo2");
insert into scores(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10)
values		(1,2,3,4,5,1,2,3,4,5),
        (5,4,3,2,1,5,4,3,2,1);

select people.name, people.photo, scores.q1, scores.q2,scores.q3,scores.q4,scores.q5,scores.q6,scores.q7,scores.q8,scores.q9,scores.q10
from people inner join scores where people.id = scores.id;