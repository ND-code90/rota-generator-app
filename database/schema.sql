CREATE DATABASE IF NOT EXISTS rota_generator_dev
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE rota_generator_dev;

CREATE TABLE teams (
team_id INT AUTO_INCREMENT PRIMARY KEY,
team_name VARCHAR (100) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO teams (team_name)
VALUES ('New team');

SELECT * FROM teams;

CREATE TABLE roles (
role_id INT AUTO_INCREMENT PRIMARY KEY,
team_id INT NOT NULL,
role_name VARCHAR(100) NOT NULL,
FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

INSERT INTO roles (team_id, role_name)
VALUES (1, 'fast team');

SELECT * FROM roles 

CREATE TABLE staff_members (
staff_member_id INT AUTO_INCREMENT PRIMARY KEY,
team_id INT NOT NULL,
role_id INT NOT NULL,
staff_name VARCHAR(100)NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
FOREIGN KEY (team_id) REFERENCES teams(team_id),
FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

INSERT INTO staff_members (
team_id,
role_id,
staff_name
)
VALUES (
1,
1,
'Staff A');

SELECT * FROM staff_members;

CREATE TABLE locations (
location_id INT AUTO_INCREMENT PRIMARY KEY,
team_id INT NOT NULL,
location_name VARCHAR(100) NOT NULL,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

INSERT INTO locations(team_id, location_name)
VALUES (1, 'Location A'),
(1, 'Location B');

SELECT * FROM locations;

ALTER TABLE staff_members
ADD flexible_working BOOLEAN NOT NULL DEFAULT FALSE;

SELECT * FROM staff_members;

CREATE TABLE staff_availability_exceptions(
exception_id INT AUTO_INCREMENT PRIMARY KEY,
staff_member_id INT NOT NULL,
availability_status VARCHAR(20) NOT NULL,
exception_type VARCHAR(50) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
FOREIGN KEY (staff_member_id)REFERENCES staff_members(staff_member_id)
);

/*adds the non working days in accordance with flexible working */
CREATE TABLE staff_non_working_days(
non_working_day_id INT AUTO_INCREMENT PRIMARY KEY,
staff_member_id INT NOT NULL ,
day_of_week VARCHAR(9) NOT NULL,
FOREIGN KEY (staff_member_id)REFERENCES staff_members(staff_member_id),
UNIQUE (staff_member_id, day_of_week)
);

/* UNIQUE stops the same weekday being added twice for the same person*/
/* adds regular set office days for selected staff members*/

CREATE TABLE staff_office_days (
    office_day_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_member_id INT NOT NULL,
    day_of_week VARCHAR(9) NOT NULL,
    FOREIGN KEY (staff_member_id) REFERENCES staff_members(staff_member_id),
    UNIQUE (staff_member_id, day_of_week)
);

/* stores each generated rota*/
CREATE TABLE rotas(
rota_id INT AUTO_INCREMENT PRIMARY KEY,/*rota_id is the unique id/number for the rota*/
team_id INT NOT NULL,
rota_start_date DATE NOT NULL,
rota_end_date DATE NOT NULL,
generated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
rota_status VARCHAR(20) NOT NULL DEFAULT 'Draft',/*rota status allows a rota to be marked as draft or final*/ 
FOREIGN KEY (team_id)REFERENCES teams(team_id)
);

/* activities table stores the type of work that appears i.e.what is the staff member assigned to on the rota*/
CREATE TABLE activities(
activity_id INT AUTO_INCREMENT PRIMARY KEY,
team_id INT NOT NULL,
activity_name VARCHAR(100) NOT NULL,
is_full_day BOOLEAN NOT NULL DEFAULT TRUE,
priority_number INT NOT NULL DEFAULT 10,/* priority_number helps the rota decide which activites to fill first, i.e. lower number means higher priority*/
is_active BOOLEAN NOT NULL DEFAULT TRUE,
FOREIGN KEY (team_id)REFERENCES teams(team_id)
);

/* rota_assignments stores individual assignment within a rota*/
CREATE TABLE rota_assignments(
assignment_id INT AUTO_INCREMENT PRIMARY KEY,
rota_id INT NOT NULL,
assignment_date DATE NOT NULL,
activity_id INT NOT NULL,
location_id INT NOT NULL,
staff_member_id INT, /* i havent added NOT NULL, so the rota shows when nobody is available*/
slot_number INT NOT NULL DEFAULT 1,/* slot_number means an activity can have several people*/
assignment_source VARCHAR(20) NOT NULL DEFAULT 'generated', /*this shows if the assignment was generated automatically by the app or manually after a manager change*/
FOREIGN KEY (rota_id) REFERENCES rotas(rota_id),
FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
FOREIGN KEY (location_id) REFERENCES locations(location_id),
FOREIGN KEY (staff_member_id)REFERENCES staff_members(staff_member_id),
UNIQUE (rota_id, assignment_date, activity_id,location_id,slot_number)
);

/*activity roles table tells the rota which staff roles can do which activity.*/
CREATE TABLE activity_roles (
activity_role_id INT AUTO_INCREMENT PRIMARY KEY,
activity_id INT NOT NULL,
role_id INT NOT NULL,
eligibility_type VARCHAR(20) NOT NULL DEFAULT 'primary', /*can help choose what staff i.e. are on duty normally and who can be used to cover*/
FOREIGN KEY (activity_id)REFERENCES activities(activity_id),
FOREIGN KEY (role_id) REFERENCES roles(role_id),
UNIQUE (activity_id, role_id) /*prevents the same role and activity combination from being added twice.*/
);

/*this table gives info on how many people are needed for each rota activity*/
CREATE TABLE cover_requirements(
cover_requirement_id INT AUTO_INCREMENT PRIMARY KEY,
activity_id INT NOT NULL,
location_id INT NOT NULL,
day_of_week VARCHAR(10) NOT NULL,
preferred_staff_number INT NOT NULL DEFAULT 1,
minimum_staff_number INT NOT NULL DEFAULT 1,
FOREIGN KEY (activity_id) REFERENCES activities(activity_id),
FOREIGN KEY (location_id) REFERENCES locations(location_id),
UNIQUE (activity_id, location_id, day_of_week),
 CHECK (preferred_staff_number >= 0),
 CHECK (minimum_staff_number >= 0),
 CHECK (preferred_staff_number >= minimum_staff_number)
 );

/* UNIQUE stops the same activity, location and weekday being entered twice*/
/* CHECK, will stop negative values or a preferred number under the minimum required*/

/*the staff office day activities table checks links a staff members set office days to the activities*/
CREATE TABLE staff_office_day_activities (
office_day_activity_id INT AUTO_INCREMENT PRIMARY KEY,
office_day_id INT NOT NULL,
activity_id INT NOT NULL,
FOREIGN KEY (office_day_id)REFERENCES staff_office_days(office_day_id),
FOREIGN KEY (activity_id)REFERENCES activities(activity_id),
UNIQUE (office_day_id, activity_id)
);

/* the next table, rota_warnings stores issues from the rota, i.e. changes*/
CREATE TABLE rota_warnings(
warning_id INT AUTO_INCREMENT PRIMARY KEY,
rota_id INT NOT NULL,/*identifies the rota with the issue*/
assignment_id INT,/* optional because some warnings affect the whole rota */
warning_type VARCHAR(50) NOT NULL, /*can be ie. staff shortage*/
warning_message VARCHAR(200) NOT NULL,
severity VARCHAR(20) NOT NULL,/* i.e. warning or error?*/
is_resolved BOOLEAN NOT NULL DEFAULT FALSE,
FOREIGN KEY (rota_id)REFERENCES rotas(rota_id),
FOREIGN KEY (assignment_id)REFERENCES rota_assignments(assignment_id)
);

/*the rota changes table stores information on when an assignment is manually changed, i.e. due to sickness so cover is needed*/
CREATE TABLE rota_changes(
change_id INT AUTO_INCREMENT PRIMARY KEY,
rota_id INT NOT NULL,
assignment_id INT NOT NULL,
previous_staff_member_id INT,
new_staff_member_id INT,/* allow an empty value i.e. incase a staff member is removed*/
change_type VARCHAR(50) NOT NULL,/*i.e. added, removed, replaced, swapped*/
change_reason VARCHAR(255) NOT NULL,/* i.e. sickness, AL, shortage, correction*/
changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (rota_id)REFERENCES rotas(rota_id),
FOREIGN KEY (assignment_id)REFERENCES rota_assignments(assignment_id),
FOREIGN KEY (previous_staff_member_id) REFERENCES staff_members(staff_member_id),
FOREIGN KEY (new_staff_member_id) REFERENCES staff_members(staff_member_id)
);

CREATE TABLE weekly_fairness_allocations(
allocation_balance_id INT AUTO_INCREMENT PRIMARY KEY,
rota_id INT NOT NULL,
staff_member_id INT NOT NULL,
activity_id INT NOT NULL,
week_start_date DATE NOT NULL,
allocation_count INT NOT NULL DEFAULT 0,
carry_forward_allocation INT NOT NULL DEFAULT 0,
FOREIGN KEY (rota_id)REFERENCES rotas(rota_id),
FOREIGN KEY (staff_member_id) REFERENCES staff_members(staff_member_id),
FOREIGN KEY (activity_id)REFERENCES activities(activity_id),
UNIQUE (rota_id, staff_member_id, activity_id, week_start_date)
);

