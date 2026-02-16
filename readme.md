# Real-Time Task Collaboration Platform

A lightweight Trello/Notion-style collaborative task management system that supports boards, lists, tasks, activity tracking, and real-time updates across multiple users.

This project demonstrates scalable backend architecture, ordered data modeling, event-driven communication, and secure multi-user collaboration.

---

## 🚀 Features

### Authentication & Security
- JWT-based authentication
- Protected routes
- Board membership authorization
- Secure socket connections
- Helmet for HTTP security
- Cookie parsing for session handling

---

### Boards, Lists & Tasks
- Create collaborative boards
- Organize tasks into ordered lists
- Drag-and-drop task movement across lists
- Update and delete tasks
- Automatic position recalculation to maintain ordering integrity

---

### Real-Time Collaboration
- Socket.IO powered live updates
- Board-based rooms for scoped event broadcasting
- Instant task movement synchronization across clients
- Event-driven architecture

---

### Activity History
Tracks important user actions such as:

- Task creation  
- Task movement  
- Task deletion  
- Task updates  

Provides an audit trail similar to production collaboration tools.

---

## 🧠 Architecture Overview

The backend follows a modular architecture to ensure maintainability and scalability.

index.js → Server + Socket initialization
app.js → Express configuration
controllers/ → Business logic
models/ → MongoDB schemas
routes/ → API endpoints
middleware/ → Auth + error handling
sockets/ → Real-time communication


### Design Principles
- Separation of concerns
- Event-driven updates
- Authorization-first approach
- Ordered data modeling
- Clean REST patterns

---

## 🗄️ Database Schema Design

### User

name
email
password
timestamps


---

### Board

title
owner
members[]
timestamps


Indexes:
- `members` → Enables fast board lookup for users.

---

### List

title
boardId
position
timestamps


Compound Index:

(boardId, position)

Ensures fast ordered retrieval.

---

### Task

title
description
boardId
listId
position
assignedTo
createdBy
timestamps


Compound Index:

(listId, position)


### Why store both `boardId` and `listId`?

This allows:

- Efficient board-wide queries  
- Easier activity tracking  
- Cleaner authorization  
- Better scalability  

Avoids expensive nested lookups.

---

### Activity

boardId
userId
action
entityId
timestamps


Index:

(boardId, createdAt DESC)


Optimized for activity feed retrieval.

---

## 🔄 Task Ordering Strategy

Instead of storing tasks in arrays, each task maintains a numeric `position`.

### Benefits:
- Predictable ordering  
- Efficient drag operations  
- Minimal query complexity  
- Scales better than nested structures  

### Delete Handling
When a task is deleted, positions are automatically shifted to prevent gaps.

Example:

Before:

0, 1, 2, 3


Delete position 1 → After:

0, 1, 2


This prevents ordering corruption.

---

## ⚡ Real-Time Sync Strategy

Socket.IO is used to broadcast state changes.

### Rooms
Each board acts as a socket room:

socket.join(boardId)


Only members of a board receive its updates.

### Broadcast Flow

Database Mutation
↓
Controller Emits Event
↓
Socket Broadcasts to Board Room
↓
Connected Clients Update Instantly


### Why emit from controllers?
Controllers represent confirmed state changes.  
Broadcasting before persistence risks client-server inconsistency.

---

## 🔐 Authorization Strategy

Every sensitive action verifies board membership:

- Creating tasks
- Moving tasks
- Updating tasks
- Deleting tasks

Prevents cross-board data access.

---

## ⚙️ API Design

### Auth

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout


---

### Boards

POST /api/boards
GET /api/boards


---

### Lists

POST /api/lists
GET /api/lists/:boardId
DELETE /api/lists/:id


---

### Tasks

POST /api/tasks
GET /api/tasks/:listId
PATCH /api/tasks/:id
DELETE /api/tasks/:id
PATCH /api/tasks/move


---

### Activity

GET /api/activity/:boardId


---

## 🧪 Running Locally

### 1. Clone Repository
```
git clone https://github.com/SyedJunaidAli1/hintro-assignment-server
cd hintro-assignment-server
```

### 2. Install Dependencies
```
npm install
```

### 3. Setup Environment Variables

Create `.env`:
```
PORT=5000
DATABASE_URL=your_mongodb_connection
JWT_SECRET=your_secret
NEXT_PUBLIC_CLIENT=http://localhost:3000
```

---

### 4. Start Server
```
npm run dev
```

Server runs on:

http://localhost:5000


---

## 🧠 Scalability Considerations

### Indexing
Used compound indexes to optimize ordered queries.

### Event-Driven Design
Sockets allow horizontal scaling with adapters like Redis if needed.

### Atomic Operations (Future Improvement)
Task mutations and activity logs could be wrapped in MongoDB transactions to guarantee consistency.

### Stateless Auth
JWT enables easy scaling across multiple server instances.

---

## ⚖️ Assumptions & Tradeoffs

### Simplicity over Overengineering
Designed as a clean monolith for faster development and clarity.

### Numeric Positioning
Chosen over fractional indexing to keep drag logic predictable for the assignment scope.

### Minimal Socket Events
Avoided event explosion to maintain readability.

---

## 🔮 Future Improvements

- Pagination for activity feeds
- Full-text search
- Redis adapter for socket scaling
- Role-based permissions
- Task comments
- File attachments

---

## 👨‍💻 Demo Credentials

Email: 123test@gmail.com
Password: 123456789

---

## 📌 Final Notes

This project focuses on:

- Clean architecture
- Real-time collaboration
- Secure multi-user design
- Ordered data structures
- Maintainable backend patterns

Built to reflect production-oriented engineering practices rather than tutorial-style CRUD.