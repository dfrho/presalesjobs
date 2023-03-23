/* eslint-disable @next/next/link-passhref */
import styled from 'styled-components'
import formatDate from '@/lib/utils/formatDate'
import { gql } from 'graphql-request'
import DOMPurify from 'isomorphic-dompurify'
import { Text } from 'styled-system-html'
import { useState } from 'react'
import hygraph from '../../hygraph'
import copyLightIcon from '../../public/static/icons/copylight.svg'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const CopyIcon = styled.svg`
  width: 12px;
  height: 12px;
  color: #fff;
  margin-right: 8px;

  &:hover {
    cursor: pointer;
  }
`

const Wrapper = styled.article`
  max-width: 700px;
  margin: 0 auto;
`

const JobTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  font-stye: italic;
`

const JobField = styled(Text)`
  margin-bottom: 8px;
`

const ApplyButton = styled.button`
  display: inline-block;
  background-color: green;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  outline: none;
  &:hover {
    background-color: darkgreen;
  }
  @media (max-width: 640px) {
    min-width: 3rem;
    min-height: 1.5rem;
  }
`

const CopyButton = styled.button`
  display: inline-block;
  background-color: green;
  border: 1px solid gray;
  padding: 8px 16px;
  border-radius: 4px;
  margin-left: 16px;
  cursor: pointer;
  color: #fff;
  outline: none;
  &:hover {
    background-color: darkgreen;
  }
  @media (max-width: 640px) {
    min-width: 3rem;
    min-height: 1.5rem;
  }
`

const CopyButtonDiv = styled.div`
  display: flex;
  align-items: center;
  max-width: content;
`

const ContactInfo = styled.div`
  /* add styles for the contact information section here */
`

const ContactLabel = styled.div`
  /* add styles for the contact label here */
`

const ContactValue = styled.div`
  /* add styles for the contact value here */
`

const StyledEmailLink = styled.a`
  color: ${(props) => (props.theme === 'light' ? '#422B64' : '#6fbff9')};
  text-decoration: none;
  transition: border-bottom 0.2s ease-in-out;
  margin-bottom: 12px;
`

const EmailLink = ({ email, label, theme }) => {
  const href = `mailto:${email}`
  return (
    <StyledEmailLink href={href} theme={theme}>
      {label || email}
    </StyledEmailLink>
  )
}

const ALLLISTINGSQUERY = gql`
  query AllListings {
    preSalesJobsListsGroup {
      jobsQuery {
        records {
          id
        }
      }
    }
  }
`

export async function getStaticPaths() {
  const { preSalesJobsListsGroup } = await hygraph.request(ALLLISTINGSQUERY)
  const listings = preSalesJobsListsGroup[0].jobsQuery.records
  let routes = listings.map((listing) => {
    const params = `/blog/${listing.id}`
    return params
  })

  return { paths: routes, fallback: false }
}

const LISTINGSQUERY = gql`
  query content_preSalesJobsList_jobsQuery {
    preSalesJobsListsGroup {
      jobsQuery {
        records {
          fields {
            Company
            CreatedAtTrack
            JobPostingURLTrack
            OpenRoleTitleTrack
            POCEmailTrack
            PointOfContactTrack
            RoleLocationTrack
            RoleTypeTrack
          }
          id
        }
      }
    }
  }
`
export async function getStaticProps({ params }) {
  const { preSalesJobsListsGroup } = await hygraph.request(LISTINGSQUERY)

  const jobListing = preSalesJobsListsGroup[0].jobsQuery.records.filter(
    (job) => job.id === params.slug[0]
  )
  return {
    props: { jobListing: jobListing[0] },
  }
}

export default function Blog({ jobListing }) {
  const [copied, setCopied] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function getThemeFromStorage() {
      const storageKey = 'theme'
      const theme = localStorage.getItem(storageKey)
      return theme ? theme : null
    }

    const theme = getThemeFromStorage()
    setTheme(theme)
  })

  const handleCopyClick = (event) => {
    event.preventDefault()
    navigator.clipboard.writeText(JobPostingURLTrack)
    setCopied(true)
  }

  const { fields } = jobListing
  const {
    Company,
    CreatedAtTrack,
    JobPostingURLTrack,
    POCEmailTrack,
    PointOfContactTrack,
    RoleLocationTrack,
    OpenRoleTitleTrack,
  } = fields

  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.nodeName.toLowerCase() === 'a') {
      node.setAttribute('target', '_blank')
    }
  })

  return (
    <Wrapper>
      <JobTitle>Open Role: {OpenRoleTitleTrack}</JobTitle>
      <JobField>Posted On: {formatDate(CreatedAtTrack)}</JobField>
      <JobField>Hiring Company: {Company}</JobField>
      <JobField>Location: {RoleLocationTrack}</JobField>
      {PointOfContactTrack !== '.' && (
        <ContactInfo>
          <ContactLabel>Point of Contact:</ContactLabel>
          <ContactValue>{PointOfContactTrack}</ContactValue>
          {POCEmailTrack !== '.' && (
            <EmailLink email={POCEmailTrack} label={POCEmailTrack} theme={theme} />
          )}
        </ContactInfo>
      )}
      <a href={JobPostingURLTrack} target="_blank" rel="noopener noreferrer">
        <ApplyButton>Apply Now</ApplyButton>
      </a>
      <CopyButton onClick={handleCopyClick}>
        <CopyButtonDiv>
          {!copied && <CopyIcon as={copyLightIcon} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </CopyButtonDiv>
      </CopyButton>
    </Wrapper>
  )
}
