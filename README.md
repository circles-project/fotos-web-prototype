# Futo Photos
This is the web interface for the Futo Photos cloud storage application.

Futo Photos is an end-to-end encrypted cloud storage app that
that enables users to securely store their photos and videos while safeguarding
security and privacy.
The mobile app for android recently started development with a proof of concept being 
internally released. This interface is synced with the [Circles](https://circu.li/circles.html)
"Photos" room in the gallery.
Futo Photos is built on Matrix, and as such, it inherits many nice
properties from Matrix, including:

Federation - Anyone can run their own server, and users on different servers can communicate with each other seamlessly.
Open APIs and data formats - Futo Photos uses standard Matrix message types, and it works
with any spec-compliant Matrix server.
Security - Futo Photos offers the same security guarantees as Matrix, using the same
E2E encryption code as in Element and other popular Matrix clients.

# Current Features
User Login and Authentication
- Implementation of the [swiclops](https://gitlab.futo.org/cvwright/swiclops) authentication flows
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
Username: testphotos3 
Domain: varun.circles-dev.net 
Password: swole

Once file encryption is implemented, you can use the [Circles Web Interface](https://gitlab.futo.org/varun/circles-web-interface) or the [Circles app](https://circu.li/circles.html) to create an account and login to
Futo Photos.

```
# open a shell/terminal and navigate to the desired folder to clone the repository
git clone https://gitlab.futo.org/varun/futo-photos-web.git

# navigate to the newly created project directory
cd futo-photos-web

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

