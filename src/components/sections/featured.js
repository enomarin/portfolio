import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"

import { FiGithub } from "react-icons/fi"
import { FiExternalLink } from "react-icons/fi"

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fileAbsolutePath: {regex: "/featured/"}, excerpt: {}}) {
        totalCount
        edges {
          node {
            id
            excerpt(pruneLength: 100)
            frontmatter {
              title
              path
              github
              demo
              title
              subtitle
              thumbnail
              metaDescription
            }
          }
        }
      }
    }
  `)
  return (
    <Container>
      <Row>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Col key={node.id} sm={12}>
            <Card className="mb-4 featured">
            <Row>
              <Col md={6} sm={12}>
                <Card.Body>
                  <Card.Header>{node.frontmatter.subtitle}</Card.Header>
                  <Card.Title>{node.frontmatter.title}</Card.Title>
                  <Card.Text>{node.frontmatter.metaDescription}</Card.Text>
                  <hr/>
                  <Card.Link href={node.frontmatter.path}>Learn more</Card.Link>
                  {node.frontmatter.github && (
                    <Card.Link href={node.frontmatter.github}>
                      <FiGithub />
                    </Card.Link>
                  )}
                  {node.frontmatter.demo && (
                    <Card.Link href={node.frontmatter.demo}>
                      <FiExternalLink />
                    </Card.Link>
                  )}
                </Card.Body>
              </Col>
              <Col md={6} sm={12}>
                <Link to={node.frontmatter.path}>
                  {!!node.frontmatter.thumbnail && (
                    <Card.Img src={node.frontmatter.thumbnail} alt={node.frontmatter.title + "- Featured Shot"} />
                  )}
                </Link>
              </Col>
            </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Featured

