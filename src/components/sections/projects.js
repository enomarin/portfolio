import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Badge from "react-bootstrap/Badge"

import { FiGithub } from "react-icons/fi"
import { BiLinkExternal } from "react-icons/bi"
import { FiFolder } from "react-icons/fi"

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fileAbsolutePath: {regex: "/projects/"}, excerpt: {}}) {
        totalCount
        edges {
          node {
            id
            excerpt(pruneLength: 100)
            frontmatter {
              name
              github
              demo
              tags
            }
          }
        }
      }
    }
  `)
  return( 
    <Container>
      <div className="projects-header">
        <h4>Miscellaneous &darr;</h4>
        <p>Other notable small projects</p>
      </div>
      <Row>
      {data.allMarkdownRemark.edges.map(({ node }) => ( 
        <Col key={node.id} lg={4} sm={6} xs={12} style={{display: "flex"}}>
          <Card className="mb-4 projects">
            <Card.Body>
              
              <Row className="post-meta">
                <Col><FiFolder className="folder"/></Col>
                <Col className="text-right">
                  { node.frontmatter.github && 
                  <Card.Link href={node.frontmatter.github}><FiGithub/></Card.Link>
                  }
                  { node.frontmatter.demo && 
                    <Card.Link href={node.frontmatter.demo}><BiLinkExternal/></Card.Link>
                  }
                </Col>
              </Row>
              <Card.Title>{node.frontmatter.name}</Card.Title>
              <Card.Text>{node.excerpt}</Card.Text>
              <div className="badges">
              { node.frontmatter.tags.map((tag, index) =>
                <Badge key={index} variant="secondary">{tag}</Badge>
              )}
            </div>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Projects

