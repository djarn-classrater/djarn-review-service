create database reviews;

create table reviews.Reviews
(
	id int auto_increment,
	studentId varchar(256) not null,
	courseId varchar(256) not null,
	context varchar(256) null,
	date datetime null,
	constraint ReviewIdUniqueIndex
		unique (id),
	constraint Reviews_student_id_uindex
		unique (studentId, courseId)
);

alter table reviews.Reviews
	add primary key (id);
