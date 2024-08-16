# FOTOS
This is the web interface for the FOTOS cloud storage application.

FOTOS is an end-to-end encrypted cloud storage app that
that enables users to securely store their photos and videos while safeguarding
security and privacy.
The mobile app for android recently started development with a proof of concept being
internally released. This interface is synced with the [Circles](https://circles-project.github.io)
"Photos" room in the gallery.
FOTOS is built on Matrix, and as such, it inherits many nice
properties from Matrix, including:

Federation - Anyone can run their own server, and users on different servers can communicate with each other seamlessly.
Open APIs and data formats - FOTOS uses standard Matrix message types, and it works
with any spec-compliant Matrix server.
Security - FOTOS offers the same security guarantees as Matrix, using the same
E2E encryption code as in Element and other popular Matrix clients.

# Current Features
User Login and Authentication
- Implementation of the [swiclops](https://github.com/circles-project/swiclops) authentication flows
     - Username and password validation/verification
     - [BS-Speke](https://gist.github.com/Sc00bz/e99e48a6008eef10a59d5ec7b4d87af3) cryptographic password verification
- Essential upload, delete, and display functionality
    - Fetching of existing files from "Photos" room on server and displays to /photos home screen
    - Uploading of x number of files to "Photos" room on server followed by display update
    - Enlarging of files by clicking on them with custom routes setup and planned image view/edit options
    - Deletion of files by sending deletion event to "Photos" room on server followed by display update

# Quickstart
## Development Quickstart
Note: Currently the fetch and upload files functionality only supports unencrypted rooms,
use this test account created with unencrypted rooms to see all features in action -

Once file encryption is implemented, you can use the [Circles Web Interface](https://github.com/circles-project/circles-web-prototype) or the [Circles app](https://circles-project.github.io) to create an account and login to
FOTOS.

```
# open a shell/terminal and navigate to the desired folder to clone the repository
git clone https://github.com/circles-project/fotos-web-prototype.git

# navigate to the newly created project directory
cd fotos-web

# install dependencies needed to run the project in the root folder of the project
npm install

# run the development server
npm run dev
```

## Build for production
```
# Follow the same steps as above (Development Quickstart) except for npm run dev
npm run build
```
