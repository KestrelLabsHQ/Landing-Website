# Client Intake & Delivery Tracker

## Purpose

A compact operational web app that helps a service business receive client requests, organize work, track progress, manage files, and present a clean delivery history.

This is not meant to be a full PSA, CRM, or ticketing platform. The goal is a focused, trustworthy product that demonstrates Kestrel Labs can design and ship practical business software.

## Product Goal

Show that Kestrel Labs can turn a messy, email-and-spreadsheet-driven client workflow into a clean, auditable, easy-to-use system.

## Primary Users

### Internal team
- owner / operator
- project manager
- account manager
- delivery lead

### Client-side users
- requester
- reviewer / stakeholder
- approver

## Core Use Case

A client submits a request with context and files. The internal team reviews it, clarifies scope, assigns ownership, tracks progress through a defined workflow, and delivers outputs back through the same system with visible history.

## Design Principles

- Be easy to understand in under a minute
- Prioritize clarity over feature breadth
- Make workflow state explicit
- Keep every important action auditable
- Support a realistic business process without enterprise bloat
- Feel polished, calm, and trustworthy

---

# Core Feature Set

## 1. Authentication and Roles

### Goal
Provide a basic but credible multi-user system.

### Core features
- Secure login
- Role-based access
- Separate internal and client-facing views
- Basic profile/account settings

### Initial roles
- **Admin**: full access
- **Internal staff**: manage requests, files, notes, statuses
- **Client user**: submit requests, view their own requests, download deliverables, comment where permitted

### Why it matters
Trust goes up immediately when the system feels like a real product rather than a loose demo.

---

## 2. Request Intake Form

### Goal
Capture a new client request in a structured way.

### Core features
- New request form
- Request title
- Request description / business need
- Request category
- Priority selection
- Desired due date
- File attachments
- Contact/requester info
- Submission confirmation

### Nice constraints
- Keep the form short and obvious
- Use guided fields instead of giant free-text forms where possible
- Allow optional supporting notes

### Why it matters
This is the front door of the product. It should instantly communicate operational competence.

---

## 3. Request Queue / Dashboard

### Goal
Give internal users a fast way to see and triage incoming work.

### Core features
- Request list view
- Status badges
- Priority badges
- Assigned owner
- Due date visibility
- Filters by status, priority, category, and assignee
- Search by title / requester / ID
- Sort by newest, due soon, priority

### Default views
- New requests
- In progress
- Waiting on client
- Ready for delivery
- Completed

### Why it matters
A good queue view makes the product look immediately useful and operationally serious.

---

## 4. Request Detail Workspace

### Goal
Create a single source of truth for each engagement item.

### Core features
- Full request summary
- Status and priority controls
- Assignee field
- Request metadata panel
- Attached files section
- Internal notes section
- Client-visible comments / updates
- Activity timeline
- Due date and delivery target

### What should be visible here
- What was requested
- Who owns it
- What state it is in
- What files are attached
- What has happened so far
- What still needs to happen

### Why it matters
This is the heart of the product. If this page is good, the entire app feels credible.

---

## 5. Workflow Status Management

### Goal
Represent the lifecycle of a request clearly and simply.

### Core statuses
- New
- Under review
- Needs clarification
- Approved / scoped
- In progress
- Waiting on client
- Ready for delivery
- Delivered
- Closed

### Core features
- Manual status changes by internal users
- Required confirmation on major transitions
- Optional status-change notes
- Timestamped history of status changes

### Why it matters
Clients and operators both need confidence that work is moving in a predictable process.

---

## 6. Assignment and Ownership

### Goal
Make accountability obvious.

### Core features
- Assign each request to an internal owner
- Optional secondary owner / reviewer later
- Show assignee in list and detail views
- “My work” filtered view

### Why it matters
This is a small feature with a big trust payoff. Business software feels real when ownership is explicit.

---

## 7. File Management

### Goal
Handle supporting materials and deliverables in one place.

### Core features
- Upload files during intake
- Add files after submission
- Distinguish between supporting files and delivered files
- Download access based on role/visibility
- Basic file metadata: uploaded by, time, filename

### Recommended v1 constraints
- Keep versioning simple
- Avoid complicated document collaboration in v1
- Focus on clean upload/download and visibility rules

### Why it matters
Requests without file handling feel incomplete for real client work.

---

## 8. Notes, Comments, and Updates

### Goal
Support real communication inside the system.

### Core features
- Internal-only notes
- Client-visible updates
- Request clarification prompts
- Simple threaded activity feed or chronological update stream

### Guardrails
- Internal notes must never leak to client view
- Client-facing updates should be visually distinct

### Why it matters
This replaces fragmented email chains and makes the product feel trustworthy and usable.

---

## 9. Delivery Tracking

### Goal
Close the loop by making handoff visible.

### Core features
- Mark request as ready for delivery
- Upload final deliverables
- Add delivery note / summary
- Mark delivered date
- Client can view/download delivered assets
- Final state recorded in history

### Why it matters
Without delivery tracking, the product looks like intake software only. Delivery makes it a full request lifecycle system.

---

## 10. Audit History / Activity Timeline

### Goal
Create a durable event history for each request.

### Core events to track
- Request created
- Fields edited
- Status changed
- Assignee changed
- File uploaded
- Comment added
- Delivery completed

### Display requirements
- Chronological timeline
- Actor + timestamp + event summary
- Clear distinction between system actions and user actions where relevant

### Why it matters
Auditability is one of the strongest trust signals you can provide in a business operations tool.

---

## 11. SLA / Due Date Awareness

### Goal
Help users avoid dropped work.

### Core features
- Requested due date
- Internal target date
- Overdue indicator
- Due-soon highlighting

### Why it matters
This adds operational seriousness without much implementation cost.

---

## 12. Reporting and Export

### Goal
Provide a lightweight way to extract business value from the data.

### Core features
- Export request list to CSV
- Filtered export by status/date/category
- Basic summary counts on dashboard

### Suggested dashboard metrics
- New requests
- Open requests
- Requests due soon
- Overdue requests
- Completed this period

### Why it matters
Executives and operators love exports, and the feature is relatively cheap compared with the trust it builds.

---

# Recommended v1 Workflow

1. Client submits request
2. Internal team reviews request
3. Internal team requests clarification if needed
4. Request is assigned and scoped
5. Work moves to in progress
6. Team uploads updates and internal notes
7. Request moves to ready for delivery
8. Deliverables are uploaded
9. Client receives delivered output
10. Request is closed with full history preserved

---

# v1 Non-Goals

To keep scope realistic, do not include these in the first version:

- Full billing/invoicing
- Deep email integration
- Complex workflow builder
- Real-time chat
- Advanced analytics
- Multi-tenant enterprise administration
- External integrations beyond basic file/object storage
- Highly granular permissions model
- Document editing/version diff tools

These are easy traps. Avoid them early.

---

# Trust Signals to Prioritize

If time is limited, prioritize the features that most strongly signal competence:

1. Clean intake flow
2. Polished request detail page
3. Clear status lifecycle
4. Good file handling
5. Visible audit timeline
6. Due date / overdue indicators
7. Seeded realistic demo data

These matter more than broad feature count.

---

# Suggested Demo Scenario

A strong portfolio demo should show:

- a client submitting a request with attachments
- the internal team triaging and assigning it
- a clarification request being logged
- status moving through review to in progress
- files being added during work
- a final deliverable uploaded and marked delivered
- a complete activity history visible at the end

That tells the whole story in a few screens.

---

# Suggested Future Enhancements

Once v1 is complete, the best next features would be:

- AI-assisted summarization of intake submissions
- AI extraction of key fields from uploaded documents
- templated request types
- customer notifications
- approval step before delivery
- branded client portal view
- lightweight internal SLA rules

The strongest optional enhancement is AI-assisted intake summarization, because it adds modern capability without changing the core product identity.

---

# Positioning for Kestrel Labs

This project should be framed as a demonstration of Kestrel Labs' ability to build:

- operational software
- workflow automation
- client-facing portals
- internal tools
- practical AI-enhanced systems

This is not just a mockup. It should feel like a small, real, production-minded product.

---

# One-Sentence Summary

A focused web application that turns client requests, files, updates, and deliverables into a clean, trackable, auditable workflow from intake to completion.
