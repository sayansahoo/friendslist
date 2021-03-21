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
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  cursor: pointer;
`;
const StyledDelete = styled.div`
  border: 1px solid lightgrey;
  padding: 5px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  cursor: pointer;
`;

const List = (props) => {
  const { list, deleteFriend, addStarRating } = props;
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <div style={{ fontSize: 16, fontWeight: "bold" }}>{list.name}</div>
        <div style={{ fontSize: 14 }}>is your friend</div>
      </StyledLeftContainer>
      <StyledRightContainer>
        <StyledFav onClick={() => addStarRating(list.key)}>
          <FontAwesomeIcon style={{ height: 15 }} icon={faStar} />
          <div>{list.starCount}</div>
        </StyledFav>
        <StyledDelete onClick={() => deleteFriend(list.key)}>
          <FontAwesomeIcon
            style={{ color: "red", height: 15 }}
            icon={faTrash}
          />
        </StyledDelete>
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default List;
