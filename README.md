# Omnichannel Automation Platform

## Overview
A production-ready, enterprise-grade SaaS platform for automating WhatsApp, Email, and SMS communications, with integrated chatbot, CRM, analytics, billing, and multi-tenant support.

## Features
- WhatsApp, Email, SMS automation
- AI-powered chatbot assistant
- Lead management (mini CRM)
- Analytics dashboard
- Subscription & billing (Stripe, Razorpay)
- Team management & permissions
- API access & developer docs
- Admin panel
- Multi-tenant architecture
- Security: JWT, OAuth, rate limiting, XSS/CSRF/SQLi protection, encrypted secrets
- Dockerized, CI/CD ready, scalable infrastructure

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, ShadCN, Framer Motion
- **Backend:** NestJS (Node.js), REST API, WebSocket, PostgreSQL, Redis
- **Auth:** JWT, OAuth (Google), role-based access
- **Infra:** Docker, CI/CD, environment config

## Setup
1. Clone the repo
2. Install dependencies:
   - `cd apps/backend && npm install`
   - `cd apps/frontend && npm install`
3. Configure environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend
   - Fill in required secrets and config
4. Run services:
   - Backend: `npm run start:dev` (NestJS)
   - Frontend: `npm run dev` (Next.js)
5. Access frontend at `http://localhost:3000` (or next available port)

## Folder Structure
- `apps/backend`: NestJS backend
- `apps/frontend`: Next.js frontend
- `.github`: Copilot instructions
- `.vscode`: VS Code tasks

## Documentation
- API docs: `/apps/backend/src/api_docs`
- Developer docs: `/apps/frontend/public/docs`
- Billing & subscription: `/apps/backend/src/billing`

## Security & Best Practices
- Role-based access control
- Secure API key management
- Webhook signature validation
- Audit & activity logs
- Input validation & protection

## Testing
- Unit & integration tests in `/apps/backend/test`

## Deployment
- Docker setup included
- CI/CD ready

---
For full feature details, see the codebase and documentation folders.
# Autoflow-saas-website
# Autoflow-saas-website
