//Copyright Joshua Payne and Paul Opiyo 2022
import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function TimeGrid({ state, setState, times, data, setData }) {
  // Sort the times by value
  times?.sort((a, b) => {
    const timeA = parseInt(a.time.substring(0, a.time.indexOf(":")));
    const timeB = parseInt(b.time.substring(0, b.time.indexOf(":")));

    if (timeA > timeB) {
      return 1;
    } else if (timeA < timeB) {
      return -1;
    }
    return 0;
  });

  const map = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  // Sort the times by day
  times?.sort((a, b) => {
    return a.time === b.time ? map[a.day] - map[b.day] : 0;
  });

  // Update the survey data with the time selected
  const manageTime = (row, col, timeID) => {
    if (state[row][col]) {
      setData([...data, timeID]);
    } else {
      const currData = data;
      const filtered = currData.filter((time) => time.id !== parseInt(timeID));
      setData(filtered);
    }
  };

  const handleClick = (row, col, event) => {
    event.preventDefault();
    let copy = [...state];
    copy[row][col] = !copy[row][col];
    setState(copy);
    manageTime(row, col, event.target.id);
  };

  const timeList = [];
  let currList = [];
  let j = 0;
  // Create the time grid values
  for (let idx = 0; idx < times.length; ++idx) {
    const row = Math.floor(idx / 7);
    const col = j;
    const timeVal = times[idx].time.substring(0, 5);

    currList.push(
      <td
        key={times[idx].id}
        id={times[idx].id}
        style={{
          backgroundColor: state[row][col] ? "salmon" : "",
          color: state[row][col] ? "white" : "",
        }}
        onClick={(event) => handleClick(row, col, event)}
      >
        {timeVal}{" "}
      </td>
    );

    ++j;

    if (j === 7) {
      timeList.push(<tr key={idx}>{currList}</tr>);
      currList = [];
      j = 0;
    }
  }

  return (
    <>
      <Form.Group className="mb-4">
        <Form.Label>Availability</Form.Label>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>R</th>
              <th>F</th>
              <th>S</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>{timeList}</tbody>
        </Table>
      </Form.Group>
    </>
  );
}

export default TimeGrid;
