# Terragrid Network

This is an online, real-time vehicle tacking web app.

### Links
* Github Nodejs code: https://github.com/jkups/terragrid-backend
* Github React code: https://github.com/jkups/terragrid-frontend

* Live demo: https://jkups.github.io/terragrid-frontend
  - Test Credentials:
    * Admin:
      * username - john@ga.co,
      * password - chicken
    * Driver:
      * username: jacob@gmail.com
      * password: chicken

### Tech Stack
* React
* Node.js

### APIs / Plugins
* Lealetjs
* React leaflet
* Leaflet motion
* Mapbox
* Socket.io
* Geolocation

## How to use
Follow these steps to use the app.

* As a Driver:
1. Login as a driver (use test credential)
2. Click on 'menu' to see assigned journeys
3. Click on 'start journey' to begin your journey. This will simulate the journey and show realtime vehicle movement on the map. This mimics the behaviour if GPS is enabled.

* As Admin:
1. Login as admin (use test credential)
2. Click on 'menu' to see all scheduled journeys
3. Click the checkbox to display journey routes and track vehicle movement. Tracking will only be shown if a journey has started.

* Demonstration:

<img src='public/terragrid_capture.gif' />

### Known Issues and Bugs
* You can start a journey multiple times. Should limit this to once and update DB when journey ends. Multiple starts is however allowed in simulation mode but can impact DB response time.
* The UX needs cleaning up and functions like photo upload is pending.

### Future features
* Enable GPS data collection and feed the coordinates into the live map
* Implement different markers to identify journey's start and end, and identify vehicles on the map
* Implement instructional navigator to instruct driver using a text to speech API
