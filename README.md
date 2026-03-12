# HolidayGuru

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Demo account (test user)

Use the following account to explore the full HolidayGuru functionality without creating a real Firebase user:

- Email: `test@holidayguru.com`
- Password: `Test@2026`

This demo user is supported by the app's mock auth/firestore mode and is stored in local state so you can test trips and activities offline.

### Pre-loaded test trips (for instant demo)

After signing in as the demo user, the dashboard starts with seeded trips:

- Sunset Beach Getaway (relaxing ocean trip)
- Mountain Hike Adventure (3-day scenic hike)

These appear immediately and can be edited, deleted, and used to add activities.

## Features

- User authentication (login/signup/logout) with form validation
- Add, update, delete trips
- Add, update, delete activities linked to a trip
- NgRx state management for trips
- Responsive UI with Ng Zorro + Tailwind styling
- Demo-mode mock services for local testing (no Firebase required)
- Unit tests with mocked services and full coverage for main components

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
