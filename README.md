![site logo](/public/static/images/twitter-card-three.png)

[Deployed App](https://presales-jobs.netlify.app/)

[Derived from this Excellent tailwind NextJS Starter Blog template.](https://github.com/timlrx/tailwind-nextjs-starter-blog)
Please support [timlrx](https://github.com/timlrx), the creator, by using and improving his code, and contributing.

## 📋 Use Case

The app uses an [Airtable as a backend data source](https://airtable.com/shrUMXSVTl2lMjIHb/tblhJ4d44919opKsl) to publish a job board for pre-sales engineers. The Airtable is maintained by an outside source but it allows for public syncing, so a copy was created that will update whenever the base does, and an API key was obtained to pull data from it.

## CMS Solution

In addition to the job board, the app also has other content, such as information about the app and author bio, that needs to be updated on the fly. For this, [Hygraph](https://hygraph.com) was used as a federated GraphQL API as a headless CMS solution. It pulls the data from the Airtable into their platform, making it simple to drop all the content into the frontend code using a very simple and declarative query syntax. And whoever owns the content can easily adjust copy or images on the fly. Using webhooks, you can then trigger a Netlify deployment whenever new **About** content is published in Hygraph, making it a seamless workflow.

## Tech Stack/Architecture

The application uses a GraphQL API to retrieve data from Hygraph's Headless CMS, which serves as the content management system for the log. The application is deployed and hosted on Netlify, a cloud computing platform that empowers frontend engineers to build apps without extensive DevOps or backend involvement using Composable Architecture. Netlify hosts the server-side rendered pages in the cloud, mostly on AWS, and pulls the content from Hygraph during each build. And Netlify is triggered by a Zapier workflow that sniffs for changes in the base AirTable triggering a deployment which activates the REST and GraphQL APIs to get the new content when building the site on the server, making the job listing content on our site near real-time data.

- [Next.js](https://nextjs.org/) - a React framework for building server-side rendered and static web applications.
- [GraphQL](https://graphql.org/) - a query language and runtime for APIs that provides a more efficient and flexible alternative to REST APIs. Very easy to request and drop data in from any backend.
- [Hygraph Headless CMS](https://hygraph.io/) - a federated GraphQL API-powered headless content management system that makes building and running a content-driven application seamless for frontend engineers and product/UI teams.
- [Netlify](https://www.netlify.com/) - a cloud computing platform that provides web hosting, serverless functions, CI/CD and innovations like branch deployment for easy approvals.
- [Zapier](https://zapier.com/) - Connects your workflows between platforms with well-tuned and tested webhooks, built and tested in their UI.
## 🌐 AirTable REST API

The [Airtable REST API](https://airtable.com/developers/web/api/introduction) was used to retrieve the data from the Airtable. Here is the AirTable documentation for their API. Once you have a workspace, it will show at the bottom of the screen and you can jump into it and its documentation and API playground for testing the endpoint (check out the **curl** commands for a Hygraph connection).

## Tutorial

[This helpful tutorial](https://hygraph.com/blog/job-aggregator-with-no-backend-code) was used to connect the REST API source to the Hygraph Schema. The article outlines the step-by-step workflow for connecting a REST API source to your Hygraph Schema, even though Next.js, not Svelte, was used as a front-end framework.

## 💡 Version 2.0

A future version of the app would be possible after upgrading the Hygraph account so multiple Remote Sources can be used. This would allow streaming data from a second jobs board, ["Who's Still Hiring?"](https://stillhiring.today/) into the API and displaying these jobs after de-duping somehow.

## 🔒 Secure HTML

The app uses `dangerouslySetInnerHTML` to render content from Hygraph, so it needed to be sanitized using `DOMPurify`. Notably, a helper method was added so it didn't sanitize the `target="_blank"` on the `<a>` tags, allowing a new tab to open when clicking on links:

```javascript
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.nodeName.toLowerCase() === 'a') {
      node.setAttribute('target', '_blank')
    }
  })
  ```

## 📊 PostHog Analytics

A privacy banner notice was implemented, with PostHog analytics activated only on user acceptance. Requires `.env` and Netlify build Environment Variable with your PostHog key: `NEXT_PUBLIC_POSTHOG_ID`.

## Images Tweak

To allow access to Hygraph CMS images, `next.config.js` required this adjustment of adding the `images` property:

```jsx
module.exports = withBundleAnalyzer({
  images: {
    domains: ['media.graphassets.com'],
  },
```

## 🤖 AI-Generated Logo

[Looka](https://looka.com/) was used for nifty AI-generated logo design.

## Summary: 

Hygraph is a very powerful and easy-to-use platform for generating static content-driven sites, assuming you know a front-end framework and GraphQL queries. The arduous set-up of the database and back-end is not required. It's all handled. There is some data modeling involved but you can convert your REST API returns to GraphQL SDL data types easily with the tutorials provided tool.

As an engineer you simply consume your Hygraph API and drop in your data points as props. The Hygraph content screens are very easy to navigate for a non-coder and built for your cross-functional partners in Product and UI, and you can set up webhooks or zapier workflows easily to trigger updates whenever content changes.

## Contributing

Contributions to this project are welcome and encouraged. If you find a bug or have a feature request, please open an issue on the repository. If you would like to contribute code to the project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
