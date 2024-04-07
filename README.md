<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://tongue-api.vercel.app/">
    <img src="public/favicon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Tongue_API</h3>

  <p align="center">
    RESTful API with full CRUD (Create, Read, Update, Delete) capabilities was developed as part of the "Tongue" Node.js project for <a href="https://www.start2impact.it">start2impact</a>. 
    <br />
    <a href="https://tongue-api.vercel.app/docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://tongue-api.vercel.app/">Live Server</a>
    ·
    <a href="https://github.com/Dantalian5/Tongue-API/issues">Report Bug</a>
    ·
    <a href="https://github.com/Dantalian5/Tongue-API/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#api-documentation">API Documentation</a></li>
      </ul></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This RESTful API with full CRUD (Create, Read, Update, Delete) capabilities was developed as part of the "Tongue" Node.js project for start2impact. It's designed to provide a robust and flexible backend solution, enabling seamless data management and interaction for applications. The API is crafted to support various frontend technologies or third-party services, offering a well-documented and user-friendly interface for developers. Whether you're building a web, mobile, or desktop application, the Tongue API facilitates efficient data handling and integration, enhancing the overall development workflow.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- MongoDB Atlas
- [Redoc](https://redocly.com/)

#### Libraries

- [Mongoose](https://mongoosejs.com/)
- [Helmet](https://helmetjs.github.io/)
- [Cors](https://www.npmjs.com/package/cors)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Compress](https://www.npmjs.com/package/compression)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Node.js version 14 or higher
  ```sh
  node -v
  ```
- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Dantalian5/Tongue-API.git
   ```
   and navigate to the project directory
   ```sh
   cd Tongue-API
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file in the root directory of the project to store your environment variables.
   ```sh
   touch .env
   ```
4. Enter your API Key:
   For this project, you need access to the MongoDB NoSQL service to manage the databases. You can use a free MongoDB account, or alternatively, you can utilize the sample server provided with the project for a hassle-free setup.

   ```js
   DATABASE_URL = <Your MongoDB Atlas URL + Api Key>;
   DATABASE_URL_STRING = <Your MongoDB Atlas URL + Api Key>;
   PORT = <Your PORT || 3000>>;
   ```

5. Update the necessary configurations in your config.js or any other configuration files your project might have. If you have database connections or external service configurations, specify them in the .env file.

6. Start the server using nodemon
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Once the server is set up, you will be able to make requests to an API that supports CRUD functionalities using GET, POST, PUT, and DELETE methods. Additionally, you can filter the content to suit your needs.

### API Documentation

The Tongue API provides a robust set of endpoints for managing users, posts, and interactions, offering comprehensive CRUD functionalities. Below is a summary of the primary capabilities of this API:

#### Users

- Create a User `(POST /api/users)`: Allows for the creation of a new user, requiring details such as nickname, age, and city.
- Retrieve All Users `(GET /api/users)`: Fetches a list of all users, with the option to search based on specific criteria `(GET /api/users/search)`.
- Retrieve, Update, and Delete a User by ID: Specific user details can be fetched `(GET /api/users/{id})`, updated `(PUT /api/users/{id})`, or deleted `(DELETE /api/users/{id})` using their unique ID.

#### Post

- Create a Post `(POST /api/posts)`: Enables the creation of a new post, linked to an existing user.
- Retrieve All Posts `(GET /api/posts)`: Obtains a list of all posts, supporting a 'minify' query for less detailed responses.
- Search Posts `(GET /api/posts/search)`: Allows for the retrieval of posts based on various search criteria.
- Retrieve, Update, and Delete a Post by ID: Similar to users, individual posts can be accessed, modified, or removed using their unique ID `(GET, PUT, DELETE on /api/posts/{id})`.

#### Interactions

- Create an Interaction `(POST /api/interactions)`: Facilitates the addition of a new interaction, such as a like or comment, to a post by a user.
- Retrieve All Interactions `(GET /api/interactions)`: Lists all interactions, with a 'minify' option for condensed output.
- Search, Retrieve, Update, and Delete an Interaction: Detailed interaction data can be searched, accessed, altered, or deleted, all identified by a unique ID `(GET, PUT, DELETE on /api/interactions/{id})`.

The API is designed to be intuitive, ensuring ease of use while providing detailed responses and error handling to facilitate integration and interaction with various front-end systems or third-party services.

_For more examples, please refer to the [Documentation](https://tongue-api.vercel.app/docs/)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Create a RESTfull API
- [x] Add CRUD (Create, Read, Update, Delete) capabilities
- [x] Create proper project structure
- [x] Add Documentation
  - [x] Add Openapi specifications
  - [x] Add Documentation using ReDoc
- [x] Add tests
  - [x] Unitary tests
  - [ ] Integration tests

See the [open issues](https://github.com/Dantalian5/Tongue-API/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Website - [Marcos Valenzuela](https://marcosvalenzuela.netlify.app)
- Frontend Mentor - [@Dantalian5](https://www.frontendmentor.io/profile/Dantalian5)
- Github - [@Dantalian5](https://github.com/Dantalian5)
- Linkedin - [Marcos Valenzuela](https://www.linkedin.com/in/marcos-valenzuela-coding)
- Twitter - [@Dantalian5](https://www.twitter.com/Dantalian5)

Project Link: [https://github.com/Dantalian5/Tongue-API](https://github.com/Dantalian5/Tongue-API)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [start2impact](https://www.start2impact.it)
- [RealFaviconGenerator](https://realfavicongenerator.net)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Dantalian5/Tongue-API.svg?style=for-the-badge
[contributors-url]: https://github.com/Dantalian5/Tongue-API/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Dantalian5/Tongue-API.svg?style=for-the-badge
[forks-url]: https://github.com/Dantalian5/Tongue-API/network/members
[stars-shield]: https://img.shields.io/github/stars/Dantalian5/Tongue-API.svg?style=for-the-badge
[stars-url]: https://github.com/Dantalian5/Tongue-API/stargazers
[issues-shield]: https://img.shields.io/github/issues/Dantalian5/Tongue-API.svg?style=for-the-badge
[issues-url]: https://github.com/Dantalian5/Tongue-API/issues
[license-shield]: https://img.shields.io/github/license/Dantalian5/Tongue-API.svg?style=for-the-badge
[license-url]: https://github.com/Dantalian5/Tongue-API/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marcos-valenzuela-coding
