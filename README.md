![tailwind-nextjs-banner](/public/static/images/twitter-card-two.png)

[Deployed](https://nash-music-log.netlify.app/) 
# Nashville Live Music Video Log

This repository contains the source code for a Next.js web application that displays a log of live music performances in Nashville, TN. The log features videos of performances by various artists and bands, as well as information about the venues and events.

The application uses a GraphQL API to retrieve data from Hygraph's Headless CMS, which serves as the content management system for the log. The application is deployed and hosted on Netlify, a cloud computing platform that empowers frontend engineers to build apps without extensive DevOps or backend involvement using Composable Architecture.

## Getting Started

To get started with the application, you can clone the repository to your local machine and run the following commands:

`npm install`
`npm start`

This will install the required dependencies and start the development server. You can then open your web browser and navigate to `http://localhost:3000` to view the application.

You will need a free Hygraph application duplicating the <b>post</b> schema you see in the GraphQL queries in `index.js` and `[slug].js`. Remember to have entries and publish them in your Hygraph dashboard. Use your GraphQL API Playground in Hygraph to test your queries. Adjust the endpoint in both instances to the <b>PUBLIC</b> API Hypgraph endpoint that is <b>READ ONLY</b>. 


## Technology Stack

The application is built using the following technologies:

- [Next.js](https://nextjs.org/) - a React framework for building server-side rendered and static web applications.
- [GraphQL](https://graphql.org/) - a query language and runtime for APIs that provides a more efficient and flexible alternative to REST APIs. Very easy to request and drop data in from any backend.
- [Hygraph Headless CMS](https://hygraph.io/) - a federated GraphQL API-powered headless content management system that makes building and running a content-driven application seamless for frontend engineers and product/UI teams.
- [Netlify](https://www.netlify.com/) - a cloud computing platform that provides web hosting, serverless functions, CI/CD and innovations like branch deployment for easy approvals.

## Work in Progress

Expect enhancements:
- Getting all tags functionality,
- and cleaning up the hard-coded content functionality. 

We are essentially unconnecting the mdx blog posts and housing and creating them in Hygraph, making this a product that can be run by non-coders after initial launch. Low code maintenance!

## Contributing

Contributions to this project are welcome and encouraged. If you find a bug or have a feature request, please open an issue on the repository. If you would like to contribute code to the project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
