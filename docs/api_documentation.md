# Planora Backend API Documentation

Welcome to the Planora API documentation. This guide provides all the necessary information for the frontend to integrate with the backend services.

## 🔑 Authentication (Better Auth)
Authentication is handled via `better-auth`. These endpoints manage sessions using HTTP-only cookies.

**Base URL:** `/api/auth`

| Endpoint | Method | Role | Description | Body |
| :--- | :--- | :--- | :--- | :--- |
| `/sign-up/email` | `POST` | Public | Register a new user | `{ email, password, name, image? }` |
| `/sign-in/email` | `POST` | Public | Login with email | `{ email, password }` |
| `/sign-out` | `POST` | User | Logout (clears cookies) | `N/A` |
| `/get-session` | `GET` | User | Get current session/user | `N/A` |
| `/forget-password` | `POST` | Public | Send reset OTP | `{ email }` |
| `/reset-password` | `POST` | Public | Reset password with OTP | `{ newPassword, token }` |

---

## 📅 Events Module
**Base URL:** `/api/v1/events`

| Endpoint | Method | Role | Description | Body / Query |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `GET` | Public | List all published events | Query: `searchTerm`, `category`, `page`, `limit` |
| `/featured` | `GET` | Public | Get the latest featured event | `N/A` |
| `/upcoming` | `GET` | Public | Get upcoming active events | `N/A` |
| `/me` | `GET` | Org/Admin | Get events created by me | `N/A` |
| `/` | `POST` | Org/Admin | Create a new event | `FormData`: `title`, `description`, `bannerImage` (file), `startDate`, `endDate`, `categoryId`, `registrationFee`, `isOnline`, `venueName`, `venueAddress`, `onlineLink`, `visibility`, `tags` |
| `/:id` | `GET` | Public | Get event details by ID | `N/A` |
| `/:id/similar` | `GET` | Public | Get similar events | `N/A` |
| `/:id` | `PUT` | Org/Admin | Update event | `FormData`: (subset of create fields) |
| `/:id/publish` | `PATCH` | Org/Admin | Change status to PUBLISHED | `N/A` |
| `/:id` | `DELETE` | Org/Admin | Delete event (soft delete) | `N/A` |

---

## 📁 Event Categories
**Base URL:** `/api/v1/categories`

| Endpoint | Method | Role | Description | Body |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `GET` | Public | List all categories | `N/A` |
| `/` | `POST` | Admin | Create category | `FormData`: `name`, `icon` (file) |
| `/:id` | `PUT` | Admin | Update category | `FormData`: `name`, `icon` (file) |
| `/:id` | `DELETE` | Admin | Delete category | `N/A` |

---

## 🤝 Participations (Joining Events)
**Base URL:** `/api/v1/participations`

| Endpoint | Method | Role | Description |
| :--- | :--- | :--- | :--- |
| `/:eventId/join` | `POST` | Participant | Join a Public Free event instantly. |
| `/:eventId/request` | `POST` | Participant | Request to join a Private Free event. |
| `/:eventId/pay-join` | `POST` | Participant | Join Public Paid event (Redir to Stripe). |
| `/:eventId/pay-request` | `POST` | Participant | Request Private Paid event. |
| `/:eventId/pay` | `POST` | Participant | Pay for an already APPROVED participation. |
| `/:eventId` | `GET` | Org/Admin | List participants for an event. |
| `/:eventId/export` | `GET` | Org/Admin | Export participants as CSV. |
| `/:eventId/users/:userId/status` | `PUT` | Org/Admin | Update status: `{ status: ParticipationStatus }` |
| `/:eventId/leave` | `DELETE` | Participant | Cancel attendance. |

---

## ✉️ Invitations
**Base URL:** `/api/v1/invitations`

| Endpoint | Method | Role | Description | Body |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `POST` | Org/Admin | Send invitations | `{ eventId, emails: string[] }` |
| `/event/:eventId` | `GET` | Org/Admin | View invites for an event | `N/A` |
| `/:invId` | `DELETE` | Org/Admin | Revoke a pending invite | `N/A` |
| `/:invId/accept` | `POST` | Participant | Accept free invite | `N/A` |
| `/:invId/pay-accept` | `POST` | Participant | Accept paid invite | `N/A` |
| `/:invId/decline` | `POST` | Participant | Reject invite | `N/A` |

---

## ⭐ Reviews & Bookmarks

### Reviews (`/api/v1/reviews`)
| Endpoint | Method | Description | Body |
| :--- | :--- | :--- | :--- |
| `/events/:id` | `GET` | Get all reviews for an event | `N/A` |
| `/events/:id` | `POST` | Write review (post-event) | `{ rating: 1-5, body?: string }` |
| `/me` | `GET` | My written reviews | `N/A` |

### Bookmarks (`/api/v1/bookmark`)
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/me` | `GET` | My bookmarked events |
| `/events/:id` | `POST` | Save event to bookmarks |
| `/events/:id` | `DELETE` | Remove from bookmarks |

---

## 💳 Payments
**Base URL:** `/api/v1/payments`

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/me` | `GET` | List my payment history with status |
| `/webhook` | `POST` | Stripe Webhook (Internal) |

---

## 🛠️ Global Selection Enums
Values to use for UI selection components:

```typescript
enum Role { ADMIN, PARTICIPANT, ORGANIZER }
enum Gender { MALE, FEMALE, OTHER }
enum EventStatus { DRAFT, PUBLISHED, CANCELLED, ENDED }
enum EventVisibility { PUBLIC, PRIVATE }
enum ParticipationStatus { PENDING, APPROVED, CONFIRMED, REJECTED, BANNED, CANCELLED }
enum InvitationStatus { PENDING, ACCEPTED, DECLINED, REVOKED, EXPIRED }
enum PaymentStatus { PENDING, COMPLETED, FAILED, REFUNDED }
```
