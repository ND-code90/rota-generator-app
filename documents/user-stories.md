# Configurable Rota Generator

## User stories for the first portfolio version

### Purpose

This document turns the project brief into a small, prioritised backlog. It uses only generic roles, fictional staff names and generic locations. No real employee or organisation information should be added to the project.

## How to read a user story

A user story describes:

> As a **type of user**, I want **a capability**, so that **I receive a benefit**.

The acceptance criteria describe the smallest observable conditions that must be true before the story can be considered complete.

### Priority labels

- **Must**: needed for a safe, usable first version
- **Should**: valuable, but the first end-to-end version can work without it
- **Could**: useful polish after the core workflow is reliable

## Epic 1: Set up the team

### US-01 — Create the organisation and team

**Priority:** Must

As a manager, I want to create one organisation and one team, so that the rota belongs to a defined workspace.

**Acceptance criteria**

- The manager can enter the organisation name and team name.
- The application supports one organisation and one team in the MVP.
- Both names are shown when the team is viewed.
- Blank names are rejected with a clear message.

### US-02 — Manage roles

**Priority:** Must

As a manager, I want to add and edit roles, so that scheduling rules can use roles rather than real people’s names.

**Acceptance criteria**

- The manager can add a role with a unique name.
- The manager can edit a role.
- Duplicate or blank role names are rejected.
- A role in use cannot be removed without a warning.

### US-03 — Manage anonymous staff profiles

**Priority:** Must

As a manager, I want to add anonymous staff profiles, so that I can build and demonstrate a rota without personal data.

**Acceptance criteria**

- A profile has a fictional staff name used on the rota.
- The application creates an internal unique ID automatically; the manager does not enter or see it.
- A profile can be assigned a role.
- A profile can be marked active or inactive.
- A blank staff name is rejected.
- Staff names do not have to be unique; the role is shown when clarification is needed.
- Real names, email addresses, payroll numbers, and other identifying information are not used in portfolio data.

### US-04 — Manage locations and activities

**Priority:** Must

As a manager, I want to define locations and activities, so that the rota can describe where staff work and what they do.

**Acceptance criteria**

- The manager can add and edit a location.
- The manager can add and edit an activity.
- Blank or duplicate names are rejected.
- An activity can be marked as a full-day activity for conflict checking.

## Epic 2: Record when staff can work

### US-05 — Record normal working days

**Priority:** Must

As a manager, I want to record each staff member’s normal working days, so that the generator does not assign them outside their working pattern.

**Acceptance criteria**

- Monday to Friday can each be marked as working or non-working.
- The pattern is stored against the anonymous staff identifier.
- A staff member is not automatically assigned on a normal non-working day.
- The manager can update the pattern.

### US-06 — Record recurring non-working days

**Priority:** Must

As a manager, I want to record a recurring compressed-hours non-working day, so that it is protected during generation.

**Acceptance criteria**

- A recurring weekday can be recorded as non-working.
- The rule can have an effective start and optional end date.
- The generator treats the day as unavailable while the rule is effective.
- A conflicting assignment is reported as invalid.

### US-07 — Record optional fixed office attendance

**Priority:** Must

As a manager, I want to record optional fixed office-attendance days for selected staff, so that agreed recurring arrangements are preserved without restricting everyone else.

**Acceptance criteria**

- A staff member can have one or more recurring fixed office-attendance weekdays.
- Fixed office-attendance days are optional and may be left blank.
- A blank day means the generator may assign office or home working as needed; it does not require home working.
- One or more permitted office assignments can be selected for the fixed days.
- The arrangement can have an effective start and optional end date.
- Generation preserves the arrangement when the staff member is available.
- Absence takes precedence over fixed office attendance for the affected date.

### US-08 — Record absence and other unavailability

**Priority:** Must

As a manager, I want to record annual leave, training, and other unavailability, so that unavailable staff are not assigned.

**Acceptance criteria**

- The manager can select an anonymous staff member, date or date range, and absence type.
- Annual leave, training, and other unavailability are supported.
- The application rejects an end date before a start date.
- The generator does not assign the person to a conflicting activity.
- Existing conflicting assignments are flagged.

## Epic 3: Configure rota rules

### US-09 — Define activity coverage

**Priority:** Must

As a manager, I want to set coverage levels for an activity, so that the generator knows how many people are required.

**Acceptance criteria**

- A coverage rule identifies an activity and applicable weekdays.
- It can store a preferred target and an absolute minimum.
- The preferred target cannot be lower than the absolute minimum.
- The absolute minimum cannot be negative.
- The rule can have effective start and end dates.

### US-10 — Define eligibility and exclusions

**Priority:** Must

As a manager, I want to define which roles may or may not perform an activity, so that invalid staff are never selected.

**Acceptance criteria**

- An activity can have one or more eligible roles.
- A role can be explicitly excluded.
- An excluded role is not assigned by the generator.
- A manual attempt to use an ineligible role is rejected or clearly flagged as an invalid override.

### US-11 — Define primary and cover groups

**Priority:** Should

As a manager, I want to identify primary and cover roles for an activity, so that the generator uses the preferred group before eligible cover staff.

**Acceptance criteria**

- An eligible role can be marked primary or cover for an activity.
- Primary staff are considered before cover staff when both are otherwise suitable.
- Cover staff can be used when the target cannot be met from the primary group.
- The rota records when cover staff were used.

### US-12 — Define incompatible activities

**Priority:** Must

As a manager, I want to identify activities that cannot occur together, so that staff are not double-booked.

**Acceptance criteria**

- Two activities can be marked incompatible.
- A person cannot receive both incompatible full-day assignments on the same date.
- Generation avoids the conflict.
- A manual change that creates the conflict is immediately flagged.

### US-13 — Set operational targets and preferences

**Priority:** Should

As a manager, I want to configure office-attendance, frequency, and activity-priority targets, so that the proposed rota reflects operational needs without treating every target as mandatory.

**Acceptance criteria**

- A target is labelled mandatory, operational target, or preference.
- Office-attendance and assignment-frequency targets can be stored.
- An activity priority can be stored.
- A rota may be generated when an operational target cannot be met.
- Unmet operational targets produce warnings rather than silent failures.

## Epic 4: Generate a safe monthly rota

### US-14 — Select a rota month

**Priority:** Must

As a manager, I want to select a calendar month, so that I can generate the correct rota period.

**Acceptance criteria**

- The manager can select a month and year.
- The period includes each Monday-to-Friday date in that month.
- Dates outside the selected month are not included as rota days.
- The selected period is shown before generation.

### US-15 — Generate a draft monthly rota

**Priority:** Must

As a manager, I want the application to generate a proposed monthly rota, so that I have a valid starting point to review.

**Acceptance criteria**

- Generation uses active staff, working patterns, absences, eligibility, fixed arrangements, and coverage rules.
- Mandatory rules are not knowingly broken.
- No person receives incompatible full-day assignments on the same date.
- Every weekday in the selected month is processed.
- The result is saved with draft status.
- The same input data can be used to reproduce or explain the generated result.

### US-16 — Apply weekly fairness

**Priority:** Must

As a manager, I want fair duties to be assessed in Monday-to-Friday blocks, so that repeated assignments are distributed reasonably.

**Acceptance criteria**

- Fairness is calculated separately for each Monday-to-Friday week.
- Only staff who are eligible and available are considered for that activity.
- A person with fewer comparable assignments is preferred when valid choices are otherwise equal.
- Fairness totals can be viewed for each week.
- Fairness never overrides a mandatory availability or eligibility rule.

### US-17 — Carry fairness imbalance forward

**Priority:** Must

As a manager, I want unavoidable over-allocation to influence the next week, so that fairness can recover over time.

**Acceptance criteria**

- Unavoidable over-allocation is stored as a fairness balance.
- The next week gives lower priority to an over-allocated person when valid alternatives exist.
- The carry-forward is visible or explainable to the manager.
- Missing an activity because of leave does not automatically create an entitlement unless a configured rule says otherwise.

## Epic 5: Review problems and recover coverage

### US-18 — See conflicts, shortages, and warnings

**Priority:** Must

As a manager, I want clear validation results, so that I know what requires attention before approval.

**Acceptance criteria**

- Mandatory-rule failures are shown as conflicts.
- Unmet operational targets are shown as warnings.
- Coverage below the absolute minimum is clearly distinguished from coverage below the preferred target.
- Each message identifies the date, activity, and reason without exposing personal data.
- A rota with unresolved mandatory conflicts cannot be approved.

### US-19 — Suggest eligible replacements

**Priority:** Must

As a manager, I want replacement suggestions when an assignment becomes uncovered, so that I can resolve the problem quickly.

**Acceptance criteria**

- Suggestions include only active, available, eligible staff.
- Suggestions exclude staff with an incompatible assignment.
- Suggestions show fictional staff names and roles.
- Suggestions are ordered using primary/cover status and current fairness where applicable.
- The manager chooses whether to accept a suggestion.
- If no replacement exists, the shortage remains visible.

## Epic 6: Adjust, save, and approve the rota

### US-20 — Make a manual change

**Priority:** Must

As a manager, I want to add, remove, or replace an assignment, so that I can apply operational judgement.

**Acceptance criteria**

- The manager can add, remove, or replace an assignment in a draft rota.
- The application records that the assignment was manually changed.
- A reason can be entered for an override.
- The original generated assignment is retained in an audit record.

### US-21 — Revalidate after a change

**Priority:** Must

As a manager, I want the rota to be checked after every manual change, so that I can see any new conflicts or shortages.

**Acceptance criteria**

- Relevant availability, eligibility, double-booking, and coverage checks run after a change.
- New and resolved messages are reflected in the validation results.
- The changed rota is not presented as valid while a mandatory conflict remains.
- Fairness totals are recalculated when the change affects them.

### US-22 — Save and reopen a draft

**Priority:** Must

As a manager, I want to save and reopen a draft rota, so that I can review it over more than one session.

**Acceptance criteria**

- A generated or edited rota can be saved as a draft.
- The selected period, assignments, warnings, and manual changes are preserved.
- The manager can reopen the draft.
- Saving does not approve the rota.

### US-23 — Approve the final rota

**Priority:** Must

As a manager, I want to approve a valid rota, so that there is one clearly identified final version.

**Acceptance criteria**

- Only a draft with no unresolved mandatory conflicts can be approved.
- Approval records the date and the generic manager account or role.
- The rota status changes from draft to approved.
- Later changes require the approved rota to return to draft or create a new version.
- Only one approved version is clearly current for the selected team and month.

### US-24 — View the rota in a familiar layout

**Priority:** Should

As a manager, I want a colour-coded calendar-style view, so that I can scan assignments and gaps quickly.

**Acceptance criteria**

- Weekdays and fictional staff names are clearly labelled, with roles available for clarity.
- Activities and/or locations use a consistent colour key.
- Shortages and conflicts do not rely on colour alone.
- Draft and approved status are visible.
- The layout remains understandable without copying a real spreadsheet or its personal data.

## Suggested build order

Building all 24 stories at once would be difficult to learn from and test. Use these small slices.

### Slice 1 — A tiny end-to-end rota

1. **US-01** — Create the organisation and team
2. **US-02** — Manage roles
3. **US-03** — Manage anonymous staff profiles
4. **US-04** — Manage locations and activities
5. **US-05** — Record normal working days
6. **US-09** — Define simple coverage
7. **US-10** — Define eligibility
8. **US-14** — Select a rota month
9. **US-15** — Generate a basic draft
10. **US-18** — Show basic shortages and conflicts

**Beginner milestone:** Generate a draft for a few fictional staff and one activity without assigning somebody on a non-working day or to an ineligible activity.

### Slice 2 — Make the rota safe and editable

1. **US-06** — Recurring non-working days
2. **US-07** — Optional fixed office attendance
3. **US-08** — Absence and unavailability
4. **US-12** — Incompatible activities
5. **US-20** — Manual changes
6. **US-21** — Revalidation
7. **US-22** — Save and reopen drafts

**Beginner milestone:** Change a saved draft and see any resulting conflict or shortage immediately.

### Slice 3 — Add useful scheduling intelligence

1. **US-11** — Primary and cover groups
2. **US-13** — Operational targets and preferences
3. **US-16** — Weekly fairness
4. **US-17** — Fairness carry-forward
5. **US-19** — Replacement suggestions
6. **US-23** — Approval and version control
7. **US-24** — Familiar colour-coded view

**Beginner milestone:** Generate, explain, adjust, validate, and approve a fair monthly rota.

## First implementation task

Start with **US-03 — Manage anonymous staff profiles**, but implement only the smallest useful version:

1. Sketch a page containing a list and an “Add staff member” form.
2. Use only `staff name`, `role`, and `active/inactive`; create the internal ID automatically.
3. Create three fictional roles and four fictional staff records.
4. Validate blank staff names.
5. Add tests for creating a valid record and rejecting a blank staff name.
6. Check that no real names or contact details appear in the test data, screenshots, commits, or documentation.

## Definition of done for each story

A story is done when:

- Its acceptance criteria pass.
- At least one normal case and one important error case are tested.
- The interface gives a useful message when input is invalid.
- No real or identifiable personal data is present.
- The change is documented briefly.
- The feature can be demonstrated using fictional data.

## Questions to decide later

These do not need to block the first slice:

- Should weekends and public holidays be completely excluded or configurable later?
- What exact action should a manager take when a mandatory minimum is impossible?
- Which manual overrides, if any, may break a mandatory rule?
- How long should audit and rota versions be retained?
- What accessibility standard and colour palette will be used?
- Is authentication part of the portfolio MVP, or will the first version use a single demonstration manager?
