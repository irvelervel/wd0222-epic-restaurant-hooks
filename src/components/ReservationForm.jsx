import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

/*
name --> string
phone --> string/number
numberOfPeople --> number
dateTime --> string (Date)
smoking --> boolean
specialRequests --> string
*/

const ReservationForm = () => {
  // state = {
  //   reservation: {
  //     name: "",
  //     phone: "",
  //     numberOfPeople: 1,
  //     dateTime: "",
  //     smoking: false,
  //     specialRequests: "",
  //   },
  // }

  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    numberOfPeople: 1,
    dateTime: '',
    smoking: false,
    specialRequests: '',
  })

  const handleChange = (propertyToSet, valueToSet) => {
    // In JS I can access to object properties in two ways:

    // const myObject = {
    //   name: "whatever"
    // }

    //1 --> myObject.name

    //2 --> myObject["name"]

    // The square brackets notation it is very rarely used, we pretty much always use the dot notation, but sometimes thinkink about objects with the square notation is useful
    // The problem here comes from the fact that object properties cannot take directly their names out of function parameters
    // In order to use a string coming as a parameter as object property name, you need to EVALUATE that by putting it into []! That will take the value of that parameter (not its name propertyToSet!) and use it as the property name

    // this.setState({
    //   reservation: {
    //     ...this.state.reservation,
    //     [propertyToSet]: valueToSet,
    //   },
    // })
    setReservation({
      ...reservation,
      [propertyToSet]: valueToSet,
    })
  }

  const handleSubmit = async (event) => {
    // event is the form submission event, your function will get it automatically!
    // Default behaviour of browsers is to reload the page during submit of forms
    // To prevent that we could use the method event.preventDefault()
    event.preventDefault()

    // I don't need to collect one by one the values from the form components! I already have all of them saved in the state!
    console.log(reservation)

    // ******************** FETCH *************************
    // HTTP Requests they need to be asynchronous operations --> Promises
    // There are mainly 2 ways to deal with Promises
    /* 1. Chain with the .then() method
      fetch(url).then( response => console.log(response)).catch(error => console.log(error))
   
      2. Async/Await (preferrable choice)
      try {
        const response = await fetch(url)
        console.log(response)
      } catch(error) {
        console.log(error)
      }
      */
    try {
      const url = 'https://striveschool-api.herokuapp.com/api/reservation'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      })

      if (response.ok) {
        alert('Reservation saved!')
        // clean the form
        // this.setState({
        //   reservation: {
        //     name: "",
        //     phone: "",
        //     numberOfPeople: 1,
        //     dateTime: "",
        //     smoking: false,
        //     specialRequests: "",
        //   },
        // })
        setReservation({
          name: '',
          phone: '',
          numberOfPeople: 1,
          dateTime: '',
          smoking: false,
          specialRequests: '',
        })
      } else {
        // we are getting a response error from the server
        const { message } = await response.json()
        alert(message)
      }
    } catch (error) {
      console.log(error)
      alert('An error occurred!')
    }
  }

  return (
    <div>
      <h2>Book your table here!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>What's your name?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert your full name here!"
            value={reservation.name}
            onChange={(event) => {
              console.log(event.target.value)
              // this.setState() it's an overwriting process! But we would like to do it as a merging process by overwriting not the entire state but
              // just the property that we specify

              // this.setState({ reservation: { ...this.state.reservation, name: event.target.value } })

              handleChange('name', event.target.value)
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>What's your phone?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insert your phone here!"
            value={reservation.phone}
            onChange={(event) => {
              // I'd like to remember also the OTHER existing values!
              // I have to set the new reservation object starting from what I already have in the state!
              // Otherwise I am going to lose all the properties who are not the one I'm trying to modify
              // Therefore I shall use the SPREAD OPERATOR to take and copy all the current properties to the new object
              // and only AFTER that I am going to pass the property I want to modify
              // this.setState({
              //   reservation: {
              //     ...this.state.reservation,
              //     phone: event.target.value,
              //   },
              // })

              handleChange('phone', event.target.value)
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>How many people?</Form.Label>
          <Form.Control
            as="select"
            value={reservation.numberOfPeople}
            onChange={(event) => {
              handleChange('numberOfPeople', event.target.value)
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>When are you coming?</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reservation.dateTime}
            onChange={(event) => {
              handleChange('dateTime', event.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          {/* Since the "value" property in checkboxes is NOT true/false, in order to get a boolean value from it, we need to read another property called checked */}
          <Form.Check
            type="checkbox"
            label="Do you smoke?"
            checked={reservation.smoking}
            onChange={(event) => {
              handleChange('smoking', event.target.checked)
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Any special requests?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reservation.specialRequests}
            onChange={(event) => {
              handleChange('specialRequests', event.target.value)
            }}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ReservationForm
