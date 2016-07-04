# Microservice Name
places-app-video-service

## Table of Contents
1. [Getting started](#getting-started)
2. [Tech](#tech)
3. [Team](#team)
4. [Contributing](#contributing)

## Getting started

Clone and install dependencies:
```sh
$ npm install
```
Create `env/development.env` and set environment variables. Follow `env/example.env`.

add any additional needed commands and instructions here

```sh
$ npm start
```

## Tech
> node / express server
> node clusters for workers
> aws s3 for file uploading


## Directory Layout
> Use the diagram below as an example and starting point
```
├── /env/                       # Environment variables
├── /node_modules/              # 3rd-party libraries and utilities
├── /dist/                      # Public distribution folder
│   ├── /videos/                # Videos
├── /server/                    # Server source code
│   ├── /clusters/              # Cluster processes
│     ├── download.js           # Download worker
│     ├── upload.js             # Upload worker
│     ├── server.js             # Http server
│   ├── /config/                # Http server config
│     ├── middleware.js         # Middleware
│     ├── routes.js             # Route handler
├── /utils/                     # Utilities
│   ├── /api.js                 # axios request functions
└── package.json                # List of 3rd party libraries and utilities to be installed
└── .eslintrc                   # ESLint settings
```

## Team
  - Microservice Developer:   [Sepehr Vakili](https://github.com/sepehrvakili)
  - Product Owner:            [Adam Lessen](https://github.com/lessenadam)
  - Scrum Master:             [Sepehr Vakili](https://github.com/sepehrvakili)
  - Development Team Members: [Jordan Tepper](https://github.com/HeroProtagonist), [Sepehr Vakili](https://github.com/jinsoocha), [Andrew Phavichitr](https://github.com/aphavichitr), [Adam Lessen](https://github.com/lessenadam)

## Contributing
See [CONTRIBUTING.md](https://github.com/places-app/places-app-web/blob/master/docs/_CONTRIBUTING.md) for contribution guidelines.