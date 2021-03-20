import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 15px auto;
  border: 1px solid grey;
  height: 45px;
  padding: 10px 20px 10px 20px;
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledRightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledFav = styled.div`
  border: 1px solid lightgrey;
  padding: 5px;
  margin-right: 10px;
`;
const StyledDelete = styled.div`
  border: 1px solid lightgrey;
  padding: 5px;
`;

const List = (props) => {
  const { list, deleteFriend } = props;
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <div style={{ fontSize: 16, fontWeight: "bold" }}>{list.name}</div>
        <div style={{ fontSize: 14 }}>is your friend</div>
      </StyledLeftContainer>
      <StyledRightContainer>
        <StyledFav>
          <FontAwesomeIcon
            style={{ cursor: "pointer", height: 15 }}
            icon={faStar}
          />
        </StyledFav>
        <StyledDelete>
          <FontAwesomeIcon
            style={{ cursor: "pointer", color: "red", height: 15 }}
            icon={faTrash}
            onClick={() => deleteFriend(list.key)}
          />
        </StyledDelete>
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default List;
