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

const StyledContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  border: 1px solid grey;
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
  margin: 50px 0;
  font-weight: bold;
`;

const StyledButton = styled.button`
  margin-right: 5px;
  border: none;
  outline: none;
  padding: 5px;
  cursor: pointer;
`;

const StyledRatings = styled.button`
  margin-right: 5px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  outline: none;
  padding: 5px;
`;

const StyledErrorMessage = styled.div`
  width: 90%;
  color: red;
  margin: 10px auto 20px auto;
  display: flex;
  justify-content: center;
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
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setFriend({ name: e.target.value, key: Date.now() });
  };

  const addFriends = (e) => {
    if (!friend.name) {
      setMessage("Please Enter a name");
      setError(true);
    } else {
      setError(false);
      setLists([...lists, friend]);
      setFriend({ name: "", key: "" });
    }
    setTimeout(() => setError(false), 1500);
  };

  const deleteFriend = (key) => {
    const temp = lists.filter((list) => list.key !== key);
    setLists(temp);
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
    return d;
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

  return (
    <StyledContainer>
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
        <StyledRatings onClick={() => setArrow(!arrow)}>
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
        {showData().length ? (
          showData().map((list, i) => (
            <List
              deleteFriend={deleteFriend}
              list={list}
              index={i}
              key={list.key}
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
    </StyledContainer>
  );
};

export default Home;
