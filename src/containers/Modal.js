import React, { useState } from "react";
import styled from "styled-components";
import Rating from "react-rating";
import empty from "./assets/images/star-empty.png";
import full from "./assets/images/star-full.png";

const StyledContainer = styled.div`
  width: 40%;
  display: ${(props) => (props.open ? "flex" : "none")};
  margin: 0 auto;
  justify-content: center;
  box-shadow: 2px 2px 5px;
  align-items: center;
  background: white;
  position: fixed;
  bottom: 250px;
  left: 20%;
  right: 20%;
  @media(max-width: 768px) {
    width: 60%;
  }
`;

const StyledContent = styled.div`
  padding: 20px;
`;

const StyledButtons = styled.div`
  margin: 20px auto;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const Modal = (props) => {
  const {
    open = false,
    shouldDelete,
    setLists,
    lists,
    closeModal,
    keyId,
    starKey,
  } = props;

  const [starCount, setStarCount] = useState(0);
  const handleDelete = () => {
    const temp = lists.filter((list) => list.key !== keyId);
    setLists(temp);
    closeModal();
  };

  const handleRating = () => {
    const t = [...lists];
    t.find((a) => a.key === starKey).starCount = starCount;
    setLists(t);
    closeModal();
  };

  return (
    <StyledContainer open={open}>
      {shouldDelete ? (
        <StyledContent>
          <div style={{ marginTop: 20 }}>
            {" "}
            Are you sure you want to delete your friend's name?{" "}
          </div>
          <StyledButtons>
            <button
              style={{ marginRight: 20, width: 70 }}
              onClick={() => handleDelete()}
            >
              Yes
            </button>
            <button style={{ width: 70 }} onClick={closeModal}>
              No
            </button>
          </StyledButtons>
        </StyledContent>
      ) : (
        <StyledContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Rating
              emptySymbol={
                <img src={empty} className="icon" alt="star empty" />
              }
              fullSymbol={<img src={full} className="icon" alt="star full" />}
              onChange={(e) => {
                setStarCount(e);
              }}
              initialRating={
                lists &&
                lists.length &&
                starKey &&
                lists.find((a) => a.key === starKey) &&
                lists.find((a) => a.key === starKey).starCount
              }
            />
            <button onClick={handleRating} style={{ marginTop: 10 }}>
              Submit
            </button>
          </div>
        </StyledContent>
      )}
    </StyledContainer>
  );
};

export default Modal;
