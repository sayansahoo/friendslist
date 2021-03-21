import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import List from "./List";
import Modal from "./Modal";

const StyledContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  border: 1px solid grey;
  height: 600px;
  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    border: none;
  }
`;

const StyledHeader = styled.div`
  background: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const StyledBox = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  border: 2px solid grey;
  border-radius: 50px;
  align-items: center;
  height: 40px;
`;

const StyledInput = styled.input`
  width: 80%;
  margin: 0 auto;
  padding: 5px;
  border: none;
  outline: none;
  border: 1px solid white;
  border-radius: 50px;
`;

const StyledList = styled.div`
  margin-top: 10px;
`;

const StyledSort = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  aling-items: center;
`;

const StyledPagination = styled.div`
  display: flex;
  width: 30%;
  margin: 10px auto;
  justify-content: space-between;
  position: fixed;
  bottom: 10px;
  left: 20%;
  right: 20%;
  @media (max-width: 768px) {
    position: absolute;
    margin: 20px auto 0 auto;
  }
`;

const StyledNumber = styled.div`
  display: flex;
  border: 2px solid #1976d2;
  color: white;
  background: ${(props) => (props.isActive ? "black" : "#1976d2")};
  border-radius: 20%;
  align-items: center;
  padding: 2px 5px;
  cursor: pointer;
  font-size: 10px;
`;

const StyledNoData = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  margin: 100px 0;
  font-weight: bold;
  font-size: 28px;
`;

const StyledButton = styled.button`
  margin-right: 5px;
  border: none;
  outline: none;
  padding: 5px;
  cursor: pointer;
  background: red;
  color: white;
  font-weight: bold;
  box-shadow: inset 0 0 2px #000000;
`;

const StyledRatings = styled.button`
  margin-right: 5px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  outline: none;
  padding: 5px;
  background: #1976d2;
  color: white;
  font-weight: bold;
  box-shadow: inset 0 0 2px #000000;
`;

const StyledErrorMessage = styled.div`
  width: 90%;
  color: red;
  margin: 10px auto 20px auto;
  display: flex;
  justify-content: center;
  font-size: 22px;
`;

const StyledBackdrop = styled.div`
  background: rgba(63, 61, 61, 0.5);
  width: 60%;
  height: 600px;
  position: fixed;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const Home = () => {
  const [lists, setLists] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [arrow, setArrow] = useState(false);
  const [friend, setFriend] = useState({
    name: "",
    key: "",
    starCount: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState();
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldRate, setShouldRate] = useState(false);
  const [keyId, setKey] = useState();
  const [starKey, setStarKey] = useState();
  const [sort, setSort] = useState(false);
  const [arr, setArr] = useState([]);

  const handleChange = (e) => {
    setFriend({
      name: e.target.value,
      key: Date.now(),
      starCount: friend.starCount,
    });
  };

  const addFriends = (e) => {
    if (!friend.name) {
      setMessage("Please Enter a name!!");
      setError(true);
    } else {
      setError(false);
      setLists([...lists, friend]);
      setFriend({ name: "", key: "", starCount: 0 });
    }
    setTimeout(() => setError(false), 1500);
  };

  const closeModal = () => {
    if (shouldDelete) {
      setShouldDelete(false);
    } else {
      setShouldRate(false);
    }
  };

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    showData();
  }, [searchTerm]);

  const showData = () => {
    let d;
    if (!searchTerm) {
      d = [...data];
    } else {
      d = data.filter((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setArr(d);
  };

  const formatData = () => {
    const end = page * 4;
    const start = end - 4;
    const temp = lists.slice(start, end);
    setData(temp);
  };

  useEffect(() => {
    if (lists && lists.length) {
      if (lists.length <= 4) {
        setPageCount(0);
        setPage(1);
      } else {
        const count = Math.ceil(lists.length / 4);
        setPageCount(count);
      }
    }
    formatData();
  }, [lists]);

  const handlePage = (id) => {
    setPage(id);
  };

  useEffect(() => {
    formatData();
  }, [page, pageCount]);

  const deleteAllFriends = () => {
    setLists([]);
    setPageCount(0);
    setData([]);
  };

  const deleteFriend = (keyId) => {
    setKey(keyId);
    setShouldDelete(true);
    setShouldRate(false);
  };

  const addStarRating = (starKey) => {
    setStarKey(starKey);
    setShouldRate(true);
    setShouldDelete(false);
  };

  useEffect(() => {
    if (sort) {
      const t = data.sort((a, b) => a.starCount - b.starCount);
      setData(t);
    } else {
      const t = data.sort((a, b) => b.starCount - a.starCount);
      setData(t);
    }
    showData();
  }, [sort]);

  useEffect(() => showData(), [data]);

  return (
    <StyledContainer>
      {(shouldDelete || shouldRate) && (
        <StyledBackdrop onClick={() => closeModal()}></StyledBackdrop>
      )}
      <StyledHeader>Friends List</StyledHeader>
      <div style={{ display: "flex", width: "90%", margin: "20px auto" }}>
        <StyledBox style={{ marginRight: 10 }}>
          <StyledInput
            onKeyPress={(e) => e.key === "Enter" && addFriends(e)}
            placeholder="Enter your friends name"
            value={friend.name}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            style={{ paddingRight: 10, cursor: "pointer" }}
            icon={faPlus}
            onClick={(e) => addFriends(e)}
          />
        </StyledBox>
        <StyledBox>
          <StyledInput
            onChange={(e) => changeSearchTerm(e)}
            value={searchTerm}
            placeholder="Enter the name you want to search..."
          />
          <FontAwesomeIcon
            style={{ paddingRight: 10, cursor: "pointer" }}
            icon={faSearch}
          />
        </StyledBox>
      </div>
      {error && <StyledErrorMessage>{message}</StyledErrorMessage>}
      <StyledSort>
        <StyledButton onClick={deleteAllFriends}>
          Delete All Friends
        </StyledButton>
        <StyledRatings
          onClick={() => {
            setArrow(!arrow);
            setSort(!sort);
          }}
        >
          <div style={{ marginRight: 5 }}>Sort By Ratings</div>
          <div>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={arrow ? faArrowDown : faArrowUp}
            />
          </div>
        </StyledRatings>
      </StyledSort>
      <StyledList>
        {arr.length ? (
          arr.map((list, i) => (
            <List
              deleteFriend={deleteFriend}
              list={list}
              index={i}
              key={list.key}
              addStarRating={addStarRating}
            />
          ))
        ) : (
          <StyledNoData>NO DATA TO SHOW</StyledNoData>
        )}
      </StyledList>
      <StyledPagination>
        {!!pageCount &&
          new Array(pageCount).fill(pageCount).map((a, i) => (
            <StyledNumber
              isActive={page === i + 1}
              onClick={() => handlePage(i + 1)}
              key={i}
            >
              {i + 1}
            </StyledNumber>
          ))}
      </StyledPagination>
      <Modal
        open={shouldDelete || shouldRate}
        lists={lists}
        setLists={setLists}
        keyId={keyId}
        closeModal={closeModal}
        shouldDelete={shouldDelete}
        starKey={starKey}
      />
    </StyledContainer>
  );
};

export default Home;
