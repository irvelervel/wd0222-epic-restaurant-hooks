// Home Component will contain the Carousel with the dishes pictures and infos. It will also display comments section

import { useState } from 'react'
import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import pastasArray from '../data/menu.json'
import ReservationForm from './ReservationForm'
import ReservationsList from './ReservationsList'

const Home = () => {
  // state = {
  //   // state is a reserved keyword
  //   selectedPasta: null,
  // }

  const [selectedPasta, setSelectedPasta] = useState(null)

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <ReservationsList />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <ReservationForm />
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        {/* <Col className="col col-xs-12 col-md-6"></Col> */}
        <Col xs={12} md={6}>
          <Carousel>
            {pastasArray.map((pasta) => (
              <Carousel.Item key={pasta.id}>
                <img
                  className="d-block w-100"
                  src={pasta.image}
                  alt="First slide"
                  onClick={() => {
                    console.log('You clicked an image!')

                    // I want to CHANGE THE STATE with the current pasta every time I click on a picture
                    // Unfortunately state cannot be modified directly (it is READONLY), I shall use a function called setState()

                    // this.setState({ selectedPasta: pasta })
                    setSelectedPasta(pasta)
                  }}
                />
                <Carousel.Caption>
                  <h3>{pasta.name}</h3>
                  <p>{pasta.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6} className="text-center">
          {/* I want to generate as many ListGroup Items as elements in the comments array of the selectedPasta (which comes from the state) 
            Every time we will modify the state, every component that is "connected" to the state will be rerendered accordingly to the new state
            */}
          <ListGroup>
            {/* Since at the beginning our initial state is {selectedPasta:null} the interface will crash. Therefore we need to check if selectedPasta is not null if we want to render comments.
              We gonna use the short circuit operator to perform a conditional rendering, if selectedPasta is null --> do not render anything, if selectedPasta it is NOT null --> render the list of comments */}
            {/* {this.state.selectedPasta &&
                this.state.selectedPasta.comments.map(comment => (
                  <ListGroup.Item>
                    {comment.comment} -- {comment.author}
                  </ListGroup.Item>
                ))} */}
            {/* As an alternative you could use the ternary operator to display a component in case the selectedPasta is null */}
            {selectedPasta ? (
              selectedPasta.comments.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  {comment.comment} -- {comment.author}
                </ListGroup.Item>
              ))
            ) : (
              <h4>No comments to display </h4>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
