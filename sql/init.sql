create table reviews.Reviews
(
	id int auto_increment,
	student_id int not null,
	course_id int not null,
	context varchar(256) null,
	date datetime null,
	constraint Review_id_uindex
		unique (id),
	constraint Review_student_id_uindex
		unique (student_id)
);

alter table reviews.Reviews
	add primary key (id);
