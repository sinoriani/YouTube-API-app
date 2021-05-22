
create table watch_history(
    id integer primary key auto_increment,
    video_id char(11),
    user_id char(25) references user(id),
    timestamp_ timestamp default current_timestamp
);

create table likes_history(
    id integer primary key auto_increment,
    video_id char(11),
    user_id char(25) references user(id),
    timestamp_ timestamp default current_timestamp
);

create table user(
    id varchar(25) primary key, 
    name varchar(150), 
    given_name varchar(150), 
    family_name varchar(150), 
    picture varchar(400), 
    locale varchar(10), 
    points integer default 0
);

ALTER TABLE user ADD countryCode VARCHAR(5) NULL;