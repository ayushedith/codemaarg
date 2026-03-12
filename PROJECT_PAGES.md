# CodeMaarg Complete Page Inventory

This document lists all important pages required for the platform.

Priority legend:
- P0 = Required for MVP
- P1 = Strongly recommended after MVP
- P2 = Scale phase / later

## 1. Astro Public SEO Pages

- P0 ` / ` Main landing page
- P0 ` /discover ` Project discovery entry page
- P0 ` /discover/projects ` Browse all published projects with filters
- P0 ` /discover/projects/[slug] ` Public project detail page
- P0 ` /discover/tags/[tag] ` SEO tag landing pages
- P0 ` /discover/trending ` Trending projects by upvotes
- P1 ` /discover/new ` Newly published projects
- P1 ` /discover/validated ` Validated/high-signal ideas
- P1 ` /discover/teams ` Teams seeking collaborators
- P0 ` /features ` Feature overview
- P0 ` /features/roadmap-generator ` Roadmap generator feature page
- P0 ` /features/idea-validation ` Idea validation feature page
- P0 ` /features/team-matchmaking ` Team matchmaking feature page
- P0 ` /how-it-works ` Workflow explanation
- P1 ` /pricing ` Pricing plans
- P2 ` /enterprise ` Enterprise and compliance page
- P1 ` /docs ` Documentation home
- P1 ` /docs/[slug] ` Documentation article page
- P1 ` /blog ` Blog index
- P1 ` /blog/[slug] ` Blog article page
- P1 ` /changelog ` Product changelog
- P1 ` /about ` About and mission
- P1 ` /contact ` Contact page
- P0 ` /community-guidelines ` Community rules
- P0 ` /terms ` Terms of service
- P0 ` /privacy ` Privacy policy
- P1 ` /cookies ` Cookie policy
- P1 ` /security ` Security practices/disclosure
- P2 ` /status ` Status page

## 2. Next.js Authentication and Identity Pages

- P0 ` /login ` Sign in
- P0 ` /signup ` Sign up
- P0 ` /auth/callback ` OAuth callback handler
- P0 ` /verify-email ` Email verification
- P0 ` /forgot-password ` Forgot password
- P0 ` /reset-password ` Reset password
- P1 ` /invite/[token] ` Invite acceptance page

## 3. Next.js Onboarding Pages

- P0 ` /onboarding/welcome ` Intro + user intent
- P0 ` /onboarding/profile ` Basic profile setup
- P0 ` /onboarding/skills ` Skills and stack capture
- P0 ` /onboarding/timezone ` Timezone and availability
- P0 ` /onboarding/github ` GitHub connect/import
- P1 ` /onboarding/goals ` Goals and interests
- P0 ` /onboarding/first-roadmap ` First roadmap generation

## 4. Next.js Core App Dashboard Pages

- P0 ` /app ` Main dashboard
- P1 ` /app/activity ` Personal activity feed
- P1 ` /app/notifications ` Notifications center
- P1 ` /app/search ` Semantic search hub
- P1 ` /app/bookmarks ` Saved projects and profiles

## 5. AI Roadmap Product Pages

- P0 ` /app/roadmaps ` My roadmap list
- P0 ` /app/roadmaps/new ` Generate roadmap
- P0 ` /app/roadmaps/[id] ` Roadmap detail
- P1 ` /app/roadmaps/[id]/edit ` Edit roadmap
- P1 ` /app/roadmaps/[id]/share ` Share and access controls
- P2 ` /app/roadmaps/templates ` Reusable roadmap templates

## 6. Idea Validation and Project Lifecycle Pages

- P0 ` /app/projects ` My projects
- P0 ` /app/projects/new ` Create project idea post
- P0 ` /app/projects/[id] ` Owner project detail
- P0 ` /app/projects/[id]/edit ` Edit project
- P1 ` /app/projects/[id]/validation ` Validation analytics
- P1 ` /app/projects/[id]/comments ` Comment moderation/management
- P1 ` /app/projects/[id]/contributors ` Contributor management
- P1 ` /app/projects/[id]/settings ` Project settings

## 7. Semantic Matchmaking Pages

- P0 ` /app/matches ` Matchmaking overview
- P0 ` /app/matches/developers ` Developer recommendations
- P1 ` /app/matches/developers/[userId] ` Candidate profile and fit breakdown
- P1 ` /app/matches/projects ` Project recommendations
- P1 ` /app/matches/teams ` Team suggestions
- P1 ` /app/matches/preferences ` Match weight tuning

## 8. Collaboration and Communication Pages

- P1 ` /app/teams ` Team list
- P1 ` /app/teams/new ` Create team
- P1 ` /app/teams/[teamId] ` Team workspace
- P1 ` /app/teams/[teamId]/members ` Team member management
- P1 ` /app/teams/[teamId]/projects ` Team projects
- P1 ` /app/messages ` Inbox
- P1 ` /app/messages/[conversationId] ` Conversation thread
- P1 ` /app/invites ` Pending invites

## 9. Public and Private Profile Pages

- P0 ` /u/[username] ` Public developer profile
- P1 ` /u/[username]/projects ` Public projects tab
- P1 ` /u/[username]/skills ` Public skills tab
- P2 ` /u/[username]/activity ` Public activity tab
- P0 ` /app/profile ` My profile
- P1 ` /app/profile/portfolio ` Portfolio links and highlights

## 10. Settings and Account Management Pages

- P0 ` /settings/account ` Account details
- P0 ` /settings/profile ` Profile settings
- P0 ` /settings/security ` Security and sessions
- P1 ` /settings/notifications ` Notification settings
- P1 ` /settings/privacy ` Privacy and visibility controls
- P1 ` /settings/integrations ` Integrations (GitHub and more)
- P1 ` /settings/billing ` Billing and invoices
- P2 ` /settings/api-keys ` API keys and webhooks
- P0 ` /settings/delete-account ` Account deletion/export

## 11. Moderation and Admin Pages

- P1 ` /mod ` Moderator dashboard
- P1 ` /mod/reports ` Report queue
- P1 ` /mod/comments ` Comment moderation queue
- P1 ` /mod/projects ` Project moderation queue
- P1 ` /admin ` Admin dashboard
- P1 ` /admin/users ` User management
- P1 ` /admin/projects ` Project controls
- P1 ` /admin/comments ` Comment controls
- P2 ` /admin/prompts ` AI prompt/version management
- P2 ` /admin/vector-index ` Vector indexing health
- P2 ` /admin/system-health ` Platform health page
- P2 ` /admin/audit-log ` Audit trail

## 12. System and Fallback Pages

- P0 ` /404 ` Not found page
- P0 ` /500 ` Internal error page
- P1 ` /maintenance ` Maintenance mode page
- P0 ` /access-denied ` Unauthorized page
- P2 ` /offline ` Offline fallback
