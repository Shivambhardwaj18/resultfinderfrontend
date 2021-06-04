import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Table,
  Form,
  Spinner,
} from "react-bootstrap";
import TableRow from "./tableRow";
import { useMutation, gql } from "@apollo/client";
import Modal from "./Modal";

const Home = () => {
  const GET_RESULT = gql`
    mutation GetResult($roll_numbers: String!) {
      getResult(roll_numbers: $roll_numbers) {
        result
      }
    }
  `;

  let inside_error = false;

  const [finalResults, setFinalResults] = useState(null);

  const [r_nums, setR_nums] = useState(null);

  const [getResult, { error, loading }] = useMutation(GET_RESULT);

  const fetchHandler = async (e) => {
    inside_error = false;
    setFinalResults(null);
    e.preventDefault();

    let form_data = e.target.r_nums.value;

    let send_str = "";

    let arr = form_data.split(" ");

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "" && arr[i] !== " " && arr[i].charCodeAt(0) > 47) {
        send_str = send_str + arr[i] + " ";
      }
    }
    if (!send_str.length) {
      inside_error = true;
      return;
    }

    setR_nums(send_str.split(" "));

    const { data } = await getResult({
      variables: {
        roll_numbers: send_str,
      },
    });

    setFinalResults(data.getResult);
  };

  let mainChunk = null;

  if (error || inside_error) {
    mainChunk = <h3>Please give a valid Input</h3>;
  }

  if (loading) {
    mainChunk = (
      <React.Fragment>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
      </React.Fragment>
    );
  }

  if (finalResults) {
    let newArr = [];

    for (let i = 0; i < r_nums.length - 1; i++) {
      newArr.push([r_nums[i], finalResults[i].result]);
    }
    let i = 0;

    mainChunk = newArr.map((x) => {
      i++;
      return <TableRow key={i} idx={i} roll_number={x[0]} result={x[1]} />;
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={fetchHandler}>
            <InputGroup className="mb-3">
              <FormControl
                name="r_nums"
                placeholder="Enter roll numbers with a space in between"
                aria-label="r_nums"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button type="submit" variant="outline-secondary">
                  Fetch
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Roll Number</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>{mainChunk}</tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Home;
