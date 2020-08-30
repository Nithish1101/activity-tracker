import React, { useState } from "react";
import { Container, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import MemberItem from "./MemberItem";
import { Error } from "../network_state/Message";

function MembersList(props) {
  const [filterText, onFilterTextChange] = useState("");

  function noMembersFound() {
    return <Error message="No members found!" />;
  }

  function filterTextField() {
    return (
      <InputGroup style={{ margin: " 20px 0" }}>
        <InputGroup.Prepend>
          <InputGroup.Text>Filter by name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => onFilterTextChange(e.target.value ?? "")}
        />
      </InputGroup>
    );
  }

  function renderUserList() {
    const filteredMembers = [...props.members].filter((item) =>
      item.real_name.toLowerCase().startsWith(filterText.toLowerCase())
    );
    const membersList = filteredMembers.map((member) => {
      return (
        <MemberItem
          key={member.id}
          name={member.real_name ?? "Anon"}
          activities={member.activity_periods}
          timeZone={member.tz}
        />
      );
    });
    return (
      <React.Fragment>
        {filterTextField()}
        <ListGroup>
          {membersList.length ? membersList : <Error message="No Match!" />}
        </ListGroup>
      </React.Fragment>
    );
  }

  return (
    <Container>
      {props.members.length ? renderUserList() : noMembersFound()}
    </Container>
  );
}

export default MembersList;
