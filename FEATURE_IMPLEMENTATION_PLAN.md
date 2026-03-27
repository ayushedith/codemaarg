# CodeMaarg Feature Implementation Plan

This document contains the complete feature list required to build CodeMaarg according to its intended product vision.

## Product Goal

CodeMaarg helps developers move from idea to shipped product through:
- AI guided roadmap generation
- Community based idea validation
- Semantic teammate matchmaking
- Structured collaboration workflows

## Phase 1 MVP Foundation

- [ ] User authentication with email and OAuth sign in
- [ ] User onboarding flow with name, bio, skills, timezone, and GitHub handle
- [ ] Profile page with editable developer information
- [ ] AI roadmap generation endpoint with strict JSON output
- [ ] Roadmap persistence and user specific roadmap history
- [ ] Create and edit project idea posts
- [ ] Publish and unpublish project ideas
- [ ] Project listing feed with filtering by tags and sort by newest
- [ ] Upvote and downvote actions with transactional counter updates
- [ ] Nested comments using materialized path structure
- [ ] Landing page to signup conversion flow

## Phase 2 Validation and Discovery

- [ ] Public project detail page with vote and comment visibility
- [ ] Trending ideas page ranked by vote signal
- [ ] Validated ideas page for high quality concepts
- [ ] Project search by title, tags, and keyword
- [ ] Bookmark saved ideas for later review
- [ ] Notification center for votes, replies, mentions, and invites
- [ ] Email notifications for important project events
- [ ] Public developer profile pages
- [ ] Basic moderation actions for flagged comments and projects

## Phase 3 Semantic Matchmaking Engine

- [ ] Embed user bios and skill context into vectors
- [ ] Embed project descriptions and tags into vectors
- [ ] Upsert vectors into MongoDB Atlas Vector Search
- [ ] Approximate nearest neighbor search for candidate retrieval
- [ ] Composite fit score calculation from semantic similarity, timezone, and skill overlap
- [ ] Developer to developer match recommendations
- [ ] Developer to project match recommendations
- [ ] Match preferences controls for users
- [ ] Fit explanation panel showing why match was recommended

## Phase 4 Collaboration Workspace

- [ ] Team creation and team profile setup
- [ ] Team invite flow and member acceptance
- [ ] Role based permissions for owners, maintainers, and contributors
- [ ] Team project workspace pages
- [ ] Milestone board linked to roadmap tasks
- [ ] Progress tracking per milestone
- [ ] Shared comment and decision log for team execution

## Phase 5 Reliability and Admin

- [ ] Admin dashboard for users, projects, comments, and reports
- [ ] Moderation queue for reported content
- [ ] Audit logs for sensitive actions
- [ ] Rate limiting for write heavy endpoints
- [ ] Request logging and operational monitoring
- [ ] Error tracking and alerting setup
- [ ] Backup and restore strategy for primary data stores
- [ ] Policy pages: privacy, terms, and community guidelines

## Phase 6 Scale and Production Readiness

- [ ] Prisma Accelerate for connection pooling and query caching
- [ ] Query optimization for high traffic feeds and comment trees
- [ ] Caching for public discovery pages
- [ ] SEO optimization for public project pages
- [ ] Accessibility pass for keyboard and screen reader support
- [ ] Core web vitals performance tuning
- [ ] Security hardening review for auth and API endpoints

## Recommended Build Order

1. Authentication and profile onboarding
2. Roadmap generation and roadmap management
3. Project posting, votes, comments, and discovery
4. Validation analytics and notifications
5. Semantic matchmaking service and recommendation UI
6. Team collaboration workspace
7. Admin controls, reliability tooling, and performance hardening

## Definition of Done for MVP

MVP is complete when a user can:
1. Sign up and complete profile setup
2. Generate an AI roadmap from an idea
3. Publish a project to the community
4. Receive votes and threaded comments
5. Discover other projects and profiles
6. Get at least one meaningful matchmaking recommendation
