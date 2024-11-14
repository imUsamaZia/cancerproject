import { gql } from "graphql-request";

export const GET_ALL_DOCTORS = gql`
  query GetAllDoctors($after: String = "") {
    doctors(after: $after, first: 6, where: {orderby: {field: LASTNAME, order: ASC}}) {
      nodes {
        id
        title
        slug
        date
        specializations {
          nodes {
            id
            name
          }
        }
        doctorsoptions {
          lastName
          location {
            ... on Location {
              id
              title
            }
          }
          cancerTreated {
            ... on Cancer {
              id
              title
            }
          }
          address
          phoneNumber
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_DOCTOR = gql`
  query GetDoctor($id: ID!) {
    doctor(id: $id, idType: SLUG) {
      id
      databaseId
      title
      slug
      specializations {
        nodes {
          id
          name
        }
      }
      doctorsoptions {
        specializationsHeading
        researchAndPublicationsHeading
        professionalMembershipsHeading
        insurancesHeading
        clinicalExperienceHeading
        educationHeading
        cancerTreatedHeading
        bookAppointmentLabel
        awardsHeading
        awards
        clinicalExperiences
        educations
        insurances
        professionalMemberships
        researchPublications
        specializations
        cancerTreated {
          ... on Cancer {
            id
            title
            slug
          }
        }
        aboutDoctor
        address
        bookAppointmentLink
        phoneNumber
      }
    }
  }
`;

export const GET_DOCTORS_SEO = gql`
  query GetDoctorSeo($id: ID!) {
    doctor(id: $id, idType: SLUG) {
      seo {
        metaDesc
        title
        readingTime
        focuskw
        metaKeywords
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_ALL_EXPERTISE = gql`
  query GetExpertiseOfDoctors {
    expertiseOfDoctors(first: 20) {
      nodes {
        id
        name
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts($after: String, $before: String, $first: Int) {
    posts(after: $after, before: $before, first: $first) {
      nodes {
        id
        title
        slug
        date
        commentCount
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query GetPost($id: ID!) {
    post(idType: SLUG, id: $id) {
      title
      slug
      date
      excerpt
      commentCount
      categories {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      blocksJSON
    }
  }
`;

export const GET_ALL_POSTS_CATEGORY = gql`
  query GetAllPostsCategories {
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_ALL_POSTS_TAGS = gql`
  query GetAllPostsTags {
    tags {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_POST_SEO = gql`
  query GetPostSeo($id: ID!) {
    post(idType: SLUG, id: $id) {
      seo {
        metaDesc
        title
        readingTime
        focuskw
        metaKeywords
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_NEWS_FEEDS = gql`
  query GetNewsFeed {
    newsFeeds {
      nodes {
        id
        title
        newsFeedOptions {
          videoUrl
        }
      }
    }
  }
`;

export const GET_ALL_CANCERS = gql`
  query GetCancers($after: String) {
    cancers(first: 40, after: $after) {
      nodes {
        id
        slug
        title
        blocksJSON
        cancersOptions {
          disableFromUser
          excerpt
        }
      }
    }
  }
`;
export const GET_CANCER = gql`
  query GetCancer($id: ID!) {
    cancer(id: $id, idType: URI) {
      blocksJSON
      title
      databaseId
      cancersOptions {
        supportGroups
        financialSupportOrganizations
        trustedInstitutions
      }
    }
  }
`;

export const GET_CANCER_SEO = gql`
  query GetCancer($id: ID!) {
    cancer(id: $id, idType: URI) {
      seo {
        metaDesc
        title
        readingTime
        focuskw
        metaKeywords
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_ALL_SYMTOMS = gql`
  query Getsymptoms {
    symptoms(first: 40) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;
export const GET_ALL_RISKS = gql`
  query GetRiskFactors {
    riskFactors(first: 40) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials(first: 40) {
      nodes {
        id
        title
        content
        testimonialOptions {
          authorName
          avatar {
            sourceUrl
          }
          designation
        }
      }
    }
  }
`;

export const GET_FAQS = gql`
  query GETFAQS {
    faqs {
      nodes {
        title
        excerpt
      }
    }
  }
`;

export const GET_PAGE_SEO = gql`
  query GetPageSeo($id: ID!, $idType: PageIdType = URI) {
    page(id: $id, idType: $idType) {
      id
      seo {
        title
        focuskw
        metaDesc
        metaKeywords
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_HOME_PAGE = gql`
  query GetHomePage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      blocksJSON
      homeOptions {
        ourMission {
          description
          heading
          image {
            sourceUrl
          }
        }
        hero {
          heading
          subHeading
        }
        cancersHeading
        newsHeading
        newsFeedSection {
          heading
          subHeading
          button {
            label
            url
          }
        }
        testimonialHeading
      }
    }
  }
`;

export const GET_CANCER_PAGE = gql`
  query GetCancerPage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      blocksJSON
    }
  }
`;

export const GET_FOOTER = gql`
  query GetHomePage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      homeOptions {
        footer {
          text
          heading
        }
        socials {
          twitter
          linkedin
          instagram
          facebook
        }
      }
    }
  }
`;

export const GET_OTHER_PAGE = gql`
  query GetPage($id: ID!) {
    page(id: $id, idType: URI) {
      id
      blocksJSON
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations {
    locations(where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        databaseId
        title
      }
    }
  }
`;

export const GET_ALL_SPECIALIZATIONS = gql`
  query GetSpecializations {
    specializations {
      nodes {
        id
        databaseId
        name
      }
    }
  }
`;

export const GET_MOST_SEARCHED = gql`
query GetCancerSearch {
  mostsearcheds(where: {orderby: {field: DATE, order: ASC}}) {
    nodes {
      id
      title
    }
  }
}
`;

export const GET_CANCER_SEARCH = gql`
query GetCancerSearch($search: String) {
  cancers(where: {search: $search}, first: 40) {
    nodes {
      id
      title
    }
  }
}
`;

export const GET_DOCTORS_PAGE = gql`
  query GetDoctors {
  page(id: "459", idType: DATABASE_ID) {
    id
    doctorsOptions {
      filter {
        cancerHeading
        locationHeading
        specializationHeading
      }
    }
  }
}
`;
