# Configurable Rota Generator

## Portfolio project brief

### Project summary

The Rota Generator is a web application that helps managers create monthly staff rotas. Managers can define staff roles, working arrangements, locations, activities, coverage requirements and eligibility rules. The system generates a proposed monthly rota, checks it for conflicts and shortages, measures fairness weekly and allows managers to make and record manual changes.

The application is designed as a generic rota platform. The first working configuration is based on an anonymised team, but its rules are stored as settings rather than built directly into the code.

## Problem

Creating a monthly rota manually is time consuming and can result in:

- Double-booked staff
- Assignments during leave or non-working days
- Insufficient operational cover
- Ineligible staff being considered for activities
- Unequal distribution of duties
- Repeated entry of the same information
- Differences between assignment and location lists
- Several competing versions of the rota

Managers need a system that creates a valid starting rota and allows them to focus on exceptions and final decisions.

## Target users

### Primary user

Anyone who is responsible for:

- Maintaining staff and working pattern information
- Recording approved leave and unavailability
- Defining rota requirements
- Generating and reviewing rotas
- Resolving shortages
- Approving the final rota

### Future users

- Managers and rota planners responsible for planning staff rotas.
- Operational teams with multiple roles, locations, and coverage requirements.
- Organisations that want to reduce the time spent creating rotas manually.

## Project goal

Build a tested web application that can generate a monthly rota from configurable rules while respecting availability, eligibility, minimum coverage, fixed arrangements and allocation fairness.

## Minimum viable product

The first version will allow a manager to:

1. Create one organisation and one team.
2. Add anonymous staff profiles.
3. Define roles.
4. Define activities and locations.
5. Record normal working days.
6. Record compressed-hours non-working days.
7. Record fixed on-site days.
8. Enter annual leave, training and other unavailability.
9. Define minimum staffing requirements.
10. Define role eligibility and exclusions.
11. Select a calendar month.
12. Generate a complete monthly rota.
13. Process fairness in Monday-to-Friday weekly blocks.
14. Carry unavoidable fairness imbalances into the following week.
15. Prevent invalid assignments and double-booking.
16. Display coverage shortages and warnings.
17. Suggest eligible replacements when an approved assignment becomes uncovered.
18. Allow managers to make manual changes.
19. Revalidate the rota after a manual change.
20. Save a draft and approved rota.
21. Display the result using a layout based on the familiar colour coded spreadsheet.

## Out of scope for the first version

- Multiple organisations
- Staff self-service
- Shift swaps
- Email or mobile notifications
- Advanced permission levels
- User-uploaded spreadsheet templates
- Automatic interpretation of unrestricted written rules
- Hourly or complex split shifts
- Automatic publishing to external systems
- Native mobile applications

These are possible future improvements.

## Generic product concepts

The application will be built around reusable concepts:

- Team
- Staff member
- Role
- Skill or eligibility
- Working pattern
- Availability
- Absence
- Location
- Activity
- Coverage requirement
- Rule
- Rota period
- Assignment
- Warning or conflict
- Manual override
- Fairness balance
- Output template

## Supported configurable rule types

The first version should support:

1. Minimum staffing for an activity
2. Preferred staffing target
3. Absolute minimum staffing
4. Required role or skill
5. Role eligibility
6. Role exclusion
7. Primary and cover groups
8. Fixed recurring working day
9. Fixed recurring non-working day
10. Fixed location day
11. Minimum location-attendance target
12. Incompatible activities
13. Assignment frequency
14. Weekly fair rotation
15. Fairness carry-forward
16. Activity priority
17. Manager override permission
18. Effective start and end dates

## Rule priorities

### Mandatory

A mandatory rule cannot normally be broken.

Examples:

- Do not assign staff to the rota during approved leave.
- Do not assign staff on contractual non-working days.
- Do not double-book incompatible full-day activities.
- Only eligible roles may perform restricted activities.
- Required minimum coverage cannot be zero.

### Operational target

The generator should satisfy the rule and show a warning when it cannot.

Examples:

- Provide the preferred number of staff.
- Provide a recurring development activity.
- Meet a weekly on-site attendance target.

### Preference

The generator uses the rule to choose between otherwise valid rotas.

Examples:

- Prefer a staff member with fewer assignments that week.
- Avoid repeatedly assigning the same weekday.
- Prefer a primary role before a cover role.

## Anonymised example configuration

### Staff groups

- Four Role A staff members: `A-01` to `A-04`
- Role B staff members: `B-01` onwards
- Role C staff members: `C-01` onwards
- Managers: `M-01` onwards

### Locations

- Location A
- Location B
- Remote

### Activities

- Frontline support
- Reception cover
- Operational duty
- Shared inbox and requests
- On-site work
- Development work
- Annual leave
- Other training
- Remote work

### Example team rules

#### Frontline support

- The required number of staff must cover on-site frontline support every working day.
- One person has the reception responsibility.
- The reception staff member handles initial contact and assists with frontline support when available.
- Role A staff are the primary frontline-support group.
- Role B and Role C staff can provide cover.
- Role B and Role C cover should be treated equally, subject to weekly workload.
- A Role A staff member should preferably provide reception cover when experienced cover staff are present.

#### Shared inbox

- Only Role A staff can cover the shared inbox.
- Shared-inbox coverage should be provided every working day where possible.
- The assigned staff member normally works remotely.
- The generator does not automatically allocate the shared-inbox staff member to frontline support.
- A manager may request telephone-support assistance manually when necessary.
- Available Role A staff should receive a fair share of shared-inbox work.
- Additional shared-inbox days rotate between available Role A staff.
- Missing a shared-inbox day through leave does not create a future entitlement.

#### Operational duty

- The required number of eligible Role B staff should cover operational duty each working day.
- At least one operational-duty staff member is essential.
- Role A and Role C staff cannot undertake operational duty.
- Operational duty work should be distributed fairly between eligible staff each week.
- A staff member may cover more than one operational-duty day when there is a shortage.
- An unusually heavy allocation reduces the person’s priority the following week.

#### On-site attendance

- Role B and Role C staff should normally attend an on-site location on an agreed number of days each week.
- Location A and Location B both count.
- The target reduces when leave or training reduces availability.
- Pre-approved fixed on-site days must be preserved.
- A working day without an on-site assignment is treated as remote work.

#### Working patterns

- A compressed-hours non-working day cannot be overridden.
- Fixed arrangements apply only when they have been recorded for that staff member.
- Annual leave blocks every assignment.
- Full-day external training blocks operational duty, frontline support, shared inbox, and on-site assignments.

#### Development work

- Development work is a combined Role A activity.
- Each Role A staff member should receive development time regularly.
- If coverage or absence prevents it, the entitlement carries forward.
- The activity cannot be combined with shared inbox or on-site frontline support.

#### Weekly fairness

- Operational duty, frontline-support cover, shared inbox, and additional attendance are assessed weekly.
- Availability is considered when comparing staff.
- A person who receives more operational duty or frontline-support cover receives lower priority the following week.
- Operational duty and frontline-support cover may occur in the same week if required, but not on the same day.

#### Changes after approval

- A new absence flags the affected assignment.
- The system suggests eligible replacements.
- A manager may select a suggestion or change the rota manually.
- Unaffected assignments remain unchanged.
- Coverage, conflicts, and fairness are recalculated after the change.

## Monthly generation approach

The manager selects a calendar month. The generator:

1. Creates the working dates.
2. Applies bank holidays and calendar exceptions.
3. Blocks leave, training, and non-working days.
4. Applies fixed arrangements.
5. Processes each Monday-to-Friday week in order.
6. Satisfies mandatory requirements.
7. Attempts to satisfy operational targets.
8. Scores valid options using fairness preferences.
9. Carries imbalances into the next week.
10. Produces one complete monthly rota.
11. Displays warnings and unresolved shortages.

Partial weeks at the start or end of a month still participate in fairness. Relevant balances can cross a month boundary.

## Acceptance tests

### Availability

- A person on annual leave receives no assignment.
- A person is not assigned on a compressed-hours non-working day.
- A person on full-day training receives no conflicting assignment.

### Eligibility

- A Role A staff member is never assigned operational duty.
- A Role C staff member is never assigned operational duty.
- Only a Role A staff member is assigned the shared inbox.
- An eligible Role B or Role C staff member can cover frontline support.

### Coverage

- Every working day has the required number of frontline-support positions.
- Exactly one frontline-support assignment contains the reception responsibility.
- The generator attempts to provide the required number of operational-duty staff.
- A day with reduced operational-duty cover displays a serious warning.
- A day with no operational-duty cover cannot be approved.

### Conflicts

- A person cannot be assigned to operational duty and frontline support on the same date.
- A person cannot be assigned to shared inbox and development work on the same date.
- Operational-duty and on-site summaries match the underlying assignments.

### Fairness

- Available Role A staff receive a fair weekly shared-inbox rotation.
- Additional shared-inbox days rotate between weeks.
- A staff member with an additional operational-duty day receives lower operational-duty priority the following week.
- A staff member with additional frontline-support cover receives lower cover priority the following week.
- Leave does not create a missed shared-inbox entitlement.

### Changes

- A new absence flags the affected assignment.
- Replacement suggestions contain only available and eligible staff.
- Replacing one assignment does not regenerate unrelated assignments.
- The edited rota is checked again for conflicts and coverage.

### Templates

- Changing the display template does not change the underlying assignments.
- Location summaries are generated rather than entered twice.

## Development stages

### Stage 1 — Project foundation

- Create the repository
- Add project documentation
- Configure automated testing
- Create the basic web application

### Stage 2 — Staff and configuration

- Teams, roles, staff, locations, and activities
- Working patterns and eligibility
- Anonymous sample data

### Stage 3 — Availability

- Leave, training, non-working days, and fixed on-site days
- Availability validation tests

### Stage 4 — Weekly scheduling engine

- Minimum staffing
- Eligibility
- Double-booking prevention
- Warnings

### Stage 5 — Fairness

- Weekly counters
- Availability-adjusted comparison
- Carry-forward balances

### Stage 6 — Monthly generation

- Calendar month selection
- Sequential weekly generation
- Partial weeks and month boundaries

### Stage 7 — Rota review

- Familiar monthly layout
- Conflict and warning panel
- Manual changes and replacement suggestions

### Stage 8 — Approval and portfolio preparation

- Draft and approved statuses
- Audit history
- Automated end-to-end tests
- Screenshots, README, demonstration data, and deployment

## Interview discussion points

This project demonstrates:

- Turning a real operational problem into software requirements
- Protecting confidentiality with anonymous test data
- Separating generic product capabilities from one team’s configuration
- Modelling mandatory constraints, operational targets, and preferences
- Test-driven development
- Database and domain modelling
- Scheduling and fairness logic
- Conflict handling
- Human oversight and explainable decisions
- Managing scope through an MVP

## Definition of success

The MVP is successful when a manager can enter anonymous staff availability and configurable rules, generate a valid monthly rota, understand any warnings, make controlled changes, and approve the result without manually rebuilding the spreadsheet.
