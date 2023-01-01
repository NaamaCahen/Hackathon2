create table patients(
	p_id serial primary key not null,
	p_password varchar(100) not null,
	p_username varchar(100) not null,
	p_first_name varchar(50) not null,
	p_last_name varchar(50) not null,
	p_gender varchar(30) not null,
	p_address varchar(100),
	p_birth_date date not null
	
)
alter table patients
add column p_email varchar(50) not null,
add column p_phone varchar(30) not null

select * from patients
select * from doctors
select * from appointments



create table doctors(
	dr_id serial primary key not null,
	dr_password varchar(100) ,
	dr_username varchar(100),
	dr_first_name varchar(50) not null,
	dr_last_name varchar(50) not null,
	specialization integer references specializations (spe_id) on delete set null,
	dr_gender varchar(30) not null,
	dr_email varchar(60) not null,
	dr_phone varchar(30)
	
)
create table specializations(
	spe_id serial primary key not null,
	spe_name varchar(100) not null
)


create table appointments(
	appointment_id serial primary key not null,
	dr_id integer references doctors(dr_id)  on delete cascade not null,
	p_id integer references patients (p_id)  on delete cascade not null,
	appointment_time timestamp  not null
	
)