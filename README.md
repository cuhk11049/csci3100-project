# Campus Trade

## Project Overview

Campus Trade is a Ruby on Rails marketplace web application for the CUHK community. It allows users to register with a `@link.cuhk.edu.hk` email address, sign in, publish items, browse listings, save favorites, and explore marketplace activity through analytics and location pages.

`TODO:` Add 2-4 sentences here to describe your product goal, target users, and the main problem your team is solving.

## Team

| Name | Student ID | GitHub Username |
| `HUANG Ruilin` | `1155211049` | `cuhk11049` |
| `[Member 2]` | `[1155xxxxxx]` | `[github-id]` |
| `[Member 3]` | `[1155xxxxxx]` | `[github-id]` |
| `[Member 4]` | `[1155xxxxxx]` | `[github-id]` |
| `[Member 5]` | `[1155xxxxxx]` | `[github-id]` |

## Tech Stack

- Ruby on Rails 8
- PostgreSQL
- Hotwire (Turbo + Stimulus)
- Sidekiq + Redis
- Cucumber, Minitest, RSpec gems
- SimpleCov gem for test coverage
- Mapbox for location display
- SendGrid for email delivery

## Setup Guide

### 1. Prerequisites

Make sure the following are installed on your machine:

- Ruby `3.3.8`
- Bundler
- PostgreSQL
- Redis


### 2. Clone the Repository

```bash
git clone https://github.com/RangerBZ/csci3100-project.git
cd csci3100-project
```

### 3. Install Dependencies

```bash
bundle install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and fill in the required values.

Example:

```env
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
SENDGRID_API_KEY=your_sendgrid_api_key
MAPBOX_TOKEN=your_mapbox_token
ADMIN_PASSWORD=your_admin_password
```

Notes:

- `DB_USERNAME` and `DB_PASSWORD` are required for PostgreSQL.
- `SENDGRID_API_KEY` is needed for the password reset email feature.
- `MAPBOX_TOKEN` is needed for the location map pages.
- `ADMIN_PASSWORD` is used by the seeded admin account in development/test.

### 5. Prepare the Database

```bash
bin/rails db:prepare
bin/rails db:seed
```

The seeded data includes:

- sample users
- sample item listings
- CUHK-related locations
- a development/test admin account

### 6. Start Required Services

Start Redis in a separate terminal:

```bash
redis-server
```

Start Sidekiq in another terminal if you want background jobs and scheduled jobs:

```bash
bundle exec sidekiq
```

### 7. Run the Application

```bash
bin/dev
```

If `bin/dev` is unavailable in your environment, you can also run:

```bash
bin/rails server
```

Then open:

```text
http://localhost:3000
```

## Test Guide

### Run the automated tests

Run Rails tests:

```bash
bin/rails test
```

Run Cucumber features:

```bash
bundle exec cucumber
```

`TODO:` If your team also used RSpec examples in practice, add the exact command here.


## Implemented Features

The table below summarizes the features currently implemented in the codebase. Please replace the owner fields with the actual teammate names.

| Feature | Description | Primary Contributor | Secondary Contributor / Reviewer |
| --- | --- | --- | --- |
| User registration | Register with validated `@link.cuhk.edu.hk` email and password confirmation | `[Fill in]` | `[Fill in]` |
| User login/logout | Authenticate existing users and manage session login/logout | `[Fill in]` | `[Fill in]` |
| User profile management | View and edit user profile details such as name and location | `[Fill in]` | `[Fill in]` |
| Marketplace listing | Browse all posted items in the marketplace | `[Fill in]` | `[Fill in]` |
| Item creation | Create a new item with name, category, description, price, and photo | `[Fill in]` | `[Fill in]` |
| Item detail page | View an item's full information and view counter | `[Fill in]` | `[Fill in]` |
| Search and filtering | Search by keyword and filter by category, status, seller location, price range, and recent posting days | `[Fill in]` | `[Fill in]` |
| Sorting and quick filters | Sort by relevance/date/price and use quick filters such as under 100 or available now | `[Fill in]` | `[Fill in]` |
| Autocomplete search | Provide keyword suggestions while searching item names | `[Fill in]` | `[Fill in]` |
| Favorites | Save and remove favorite items and view favorite listings | `[Fill in]` | `[Fill in]` |
| Reserve / purchase flow | Mark items as reserved or sold | `[Fill in]` | `[Fill in]` |
| Password reset by email | Send verification code and reset password through email flow | `[Fill in]` | `[Fill in]` |
| Analytics dashboard | View charts and summaries for listing activity, categories, status, pricing, and community activity | `[Fill in]` | `[Fill in]` |
| Location pages | Browse CUHK-related locations and visualize them on Mapbox maps | `[Fill in]` | `[Fill in]` |
| Background email report | Scheduled daily report worker using Sidekiq and cron | `[Fill in]` | `[Fill in]` |
| Admin seed account | Seed an admin user for development/test environments | `[Fill in]` | `[Fill in]` |


## SimpleCov Report Screenshot

`TODO:` Replace the placeholder below with your actual SimpleCov report screenshot.

Example Markdown:

```md
![SimpleCov Report](docs/simplecov-report.png)
```

You can also add a short note below the screenshot:

`TODO:` Coverage summary: `[e.g. 92.4% line coverage on April 14, 2026]`

## Demo / Deployment

`TODO:` Add your deployed URL, demo video link, or leave this section out if not required.

- Demo URL: `[Fill in]`
- Demo video: `[Fill in]`

## Notes for Markers

- Default database names in `config/database.yml` are `campus_trade_development` and `campus_trade_test`.
- Redis is required for Sidekiq-related features.
- Some features depend on external tokens or services, especially SendGrid and Mapbox.
- Seed data is intended for development/test usage.

