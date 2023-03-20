import formatDate from '@/lib/utils/formatDate'
import { gql } from 'graphql-request'
import { Div, Text } from 'styled-system-html'
import { useState } from 'react'
import styled from 'styled-components'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import hygraph from '../hygraph'

const Button = styled.button`
  display: inline-block;
  background-color: ${(props) => (props.showRemoteOnly ? '#ccc' : 'green')};
  color: #fff;
  padding: 8px 16px;
  width: 200px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`

const GreenButton = styled.a`
  display: inline-block;
  background-color: green;
  border: 1px solid gray;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 16px;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
  outline: none;
  text-decoration: none;
  &:hover {
    background-color: darkgreen;
  }
  @media (max-width: 640px) {
    min-width: 3rem;
    min-height: 1.5rem;
  }
`
const ListingWrapper = styled(Div)`
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
`

const LISTINGSQUERY = gql`
  query content_preSalesJobsList_jobsQuery {
    preSalesJobsListsGroup {
      jobsQuery {
        records {
          fields {
            Company
            CreatedAtTrack
            JobPostingURLTrack
            POCEmailTrack
            PointOfContactTrack
            RoleLocationTrack
            RoleTypeTrack
            OpenRoleTitleTrack
          }
          id
        }
      }
    }
  }
`

export async function getStaticProps() {
  const { preSalesJobsListsGroup } = await hygraph.request(LISTINGSQUERY)

  const sortedByDateJobs = preSalesJobsListsGroup[0].jobsQuery.records.sort(function (a, b) {
    return new Date(b.fields.CreatedAtTrack) - new Date(a.fields.CreatedAtTrack)
  })
  return {
    props: { jobListings: sortedByDateJobs },
  }
}

export default function Home({ jobListings }) {
  const [showRemoteOnly, setShowRemoteOnly] = useState(false)

  const toggleRemoteFilter = () => {
    setShowRemoteOnly((prev) => !prev)
  }

  const listingsToRender = showRemoteOnly
    ? jobListings.filter((job) => job.fields.RoleLocationTrack === 'Remote')
    : jobListings

  return (
    <Div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Div p={1} maxWidth="1200px" mx="auto" textAlign="center">
        <Div pb={4}>
          <Button onClick={toggleRemoteFilter} bg="green" color="white">
            {showRemoteOnly ? 'Show all' : 'Show remote only'}
          </Button>
        </Div>
        {listingsToRender.map((listing) => (
          <ListingWrapper key={listing.id}>
            <Text fontWeight="bold">{listing.fields.OpenRoleTitleTrack}</Text>
            <Text>{listing.fields.Company}</Text>
            <Text>posted: {formatDate(listing.fields.CreatedAtTrack)}</Text>
            <Text>location: {listing.fields.RoleLocationTrack}</Text>
            <Div>
              <GreenButton
                rel="noopener noreferrer"
                target="_blank"
                href={listing.fields.JobPostingURLTrack}
              >
                Apply
              </GreenButton>
              <GreenButton rel="noopener noreferrer" target="_blank" href={`/blog/${listing.id}`}>
                Details
              </GreenButton>
            </Div>
          </ListingWrapper>
        ))}
      </Div>
    </Div>
  )
}
