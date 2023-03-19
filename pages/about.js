import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { GraphQLClient, gql } from 'graphql-request'
import DOMPurify from 'isomorphic-dompurify'
import hygraph from '../hygraph'

const AUTHORQUERY = gql`
  {
    authors {
      name
      title
      biographyHtml {
        html
      }
      picture {
        url
      }
      company
      github
      email
      linkedin
    }
  }
`

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const { authors } = await hygraph.request(AUTHORQUERY)
  return { props: { authorDetails: authors[1] } }
}

export default function About({ authorDetails }) {
  const { name, picture, title, company, email, linkedin, github, biographyHtml } = authorDetails

  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.nodeName.toLowerCase() === 'a') {
      node.setAttribute('target', '_blank')
    }
  })

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="flex flex-col pt-8 md:flex-row md:space-x-8">
          <div className="flex w-full items-center justify-center md:w-1/3">
            <Image
              src={picture.url}
              alt="avatar"
              width="192px"
              height="192px"
              className="mx-auto h-48 w-48 rounded-full md:mx-0"
            />
          </div>
          <div className="flex w-full flex-col md:w-2/3">
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{title}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
            <div className="pt-8">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(biographyHtml.html) }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
