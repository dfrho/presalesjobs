import formatDate from '@/lib/utils/formatDate'
import { GraphQLClient, gql } from 'graphql-request'
import { Div, Text, A } from 'styled-system-html'
import { useState } from 'react'
import styled from 'styled-components'

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
  const hygraph = new GraphQLClient(
    'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clf8fl33302ow01umha9250xr/master'
  )
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
      <Div p={1} maxWidth="1200px" mx="auto" textAlign="center">
        <Div pb={4}>
          <Button onClick={toggleRemoteFilter} bg="green" color="white">
            {showRemoteOnly ? 'Show all' : 'Show remote only'}
          </Button>
        </Div>
        {listingsToRender.map((listing) => (
          <Div key={listing.id} pb={5}>
            <Text fontWeight="bold">{listing.fields.OpenRoleTitleTrack}</Text>
            <Text>{formatDate(listing.fields.CreatedAtTrack)}</Text>
            <Text>{listing.fields.Company}</Text>
            <Text>{listing.fields.RoleLocationTrack}</Text>
            <Div>
              <A href={listing.fields.JobPostingURLTrack}>Apply</A>
            </Div>
            <A href={`/blog/${listing.id}`}>Details</A>
          </Div>
        ))}
      </Div>
    </Div>
  )
}
