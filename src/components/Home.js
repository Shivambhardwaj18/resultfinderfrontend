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

  const [finalResults, setFinalResults] = useState([]);

  const [r_nums, setR_nums] = useState([]);

  const [getResult, { error, loading }] = useMutation(GET_RESULT);

  const finalResultSetter = (to_save_data) => {
    setFinalResults(to_save_data);
  };

  const fetchHandler = async (e) => {
    inside_error = false;
    setFinalResults([]);
    setR_nums([]);
    e.preventDefault();

    let form_data = e.target.r_nums.value;

    let arr = form_data.split(",");
    let to_save_data = [];
    let x = new Array();

    for (let i = 0; i < arr.length; i++) {
      const { data } = await getResult({
        variables: {
          roll_numbers: arr[i],
        },
      });

      to_save_data.push({ result: data.getResult[0].result });

      finalResultSetter(to_save_data);
    }

    setR_nums(arr);
  };

  let mainChunk = null;

  if (error || inside_error) {
    mainChunk = <h3>Please give a valid Input</h3>;
  }

  let loading_goingon = null;

  if (loading) {
    loading_goingon = (
      <React.Fragment>
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
      </React.Fragment>
    );
  }

  if (finalResults.length > 0) {
    let newArr = [];

    for (let i = 0; i < r_nums.length; i++) {
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
          <tbody>{loading_goingon}</tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Home;
