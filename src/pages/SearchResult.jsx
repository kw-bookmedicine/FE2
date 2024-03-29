import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import closeIcon from "../assets/closeIconRound.svg";
import starIcon from "../assets/icons8-별-30 (1).png";
import api from "./../services/api";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";

const SearchResult = () => {
  const navigate = useNavigate();
  const { title } = useParams(); // path로 책 제목 가져오기
  const [viewMode, setViewMode] = useState(true); // 책 뷰 선택(리스트/카드)
  const [books, setBooks] = useState([]); // 책 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [booksPerPage, setBooksPerPage] = useState(10); // 페이지당 책 수
  const [loading, setLoading] = useState(false); // 로딩

  const [input, setInput] = useState(""); // 검색 데이터
  const [searchType, setSearchType] = useState("title"); // 검색 유형 상태
  const [searchData, setSearchData] = useState([]); // 검색 결과 데이터
  const [isShow, setIsShow] = useState(false); // 검색창 모달창

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(input);
    }, 100);

    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
    return () => clearTimeout(timer);
  }, [input]);

  const fetchBooks = async (searchInput) => {
    if (input.trim() === "") return; // 빈 문자열일 때 API 호출 방지

    let endpoint = "";
    if (searchType === "title") {
      endpoint = `/api/search/book?title=${searchInput}&target=modal`;
    }
    if (searchType === "author") {
      endpoint = `/api/search/book?author=${searchInput}&target=modal`;
    }
    if (searchType === "keyword") {
      endpoint = `/api/search/keyword?name=${searchInput}&target=modal`;
    }

    try {
      const response = await api.get(endpoint);
      console.log("test", searchType, response.data);
      setSearchData(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      fetchBooks(input);
      if (input.length > 0) navigate(`/search/result/${input}`);
      setIsShow(false);
    }
  };

  // 현재 책들 정보
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  console.log(indexOfFirstBook, indexOfLastBook);
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(books.length);
  console.log(currentBooks);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          // `/api/search/book?title=${title}&target=page&page=${currentPage-1}&size=${booksPerPage}`
          `/api/search/book?title=${title}&target=page&page=0&size=999`
        );
        console.log(response.data);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("책 데이터 GET 요청 실패", error);
      }
    };
    getSearchResults();
  }, [title]);

  let searchResultsCount = books.length;
  searchResultsCount = searchResultsCount.toLocaleString();
  let searchResultsKeywordCount = 123;
  let reviewCount = 123;

  const handleSizeChange = (event) => {
    setBooksPerPage(event.target.value);
  };

  return (
    <>
      <Header />
      <Main onClick={() => setIsShow(false)}>
        {/* 검색창 컴포넌트 만들어야함 */}
        {/* <SearchInputWrap>
          <SelectMenu>
            <option value="title" selected>
              제목
            </option>
            <option value="author">저자</option>
            <option value="keyword">키워드</option>
          </SelectMenu>
          <SearchInput type="text" placeholder="검색어를 입력하세요" />
        </SearchInputWrap> */}
        <SearchBox
          input={input}
          setInput={setInput}
          searchType={searchType}
          setSearchType={setSearchType}
          isShow={isShow}
          setIsShow={setIsShow}
          searchBook={searchBook}
          searchData={searchData}
        />

        <section id="search-title" style={{ marginBottom: "80px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
            <span style={{ color: "#67B6C1" }}>"{title}"</span> 에 대한
            <span style={{ color: "#67B6C1" }}>
              {" "}
              {searchResultsCount} 개의 검색 결과
            </span>
          </h1>
        </section>

        <ContentsWrap>
          <aside>
            <ContentTitle style={{ marginBottom: "20px" }}>
              키워드 검색
            </ContentTitle>
            <input
              type="text"
              placeholder="키워드 추가"
              style={{
                borderRadius: "10px",
                border: "1px solid #6B6565",
                padding: "8px 8px 8px 12px",
                fontSize: "1rem",
              }}
            />
          </aside>

          <section style={{ paddingLeft: "2.5rem", width: "100%" }}>
            {/* 헤더 영역 */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "1px solid #c4bebe",
              }}
            >
              <ContentTitle>
                전체{" "}
                <span style={{ color: "#67B6C1" }}>
                  {searchResultsKeywordCount}건
                </span>
              </ContentTitle>
              <div>
                <div style={{ display: "flex" }}>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "130px",
                      border: "1px solid #C0C0C0 ",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      // marginRight: "10px",
                    }}
                  >
                    <option value="" selected>
                      인기순
                    </option>
                    <option value="">평점순</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "130px",
                      border: "1px solid #C0C0C0 ",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                    onChange={handleSizeChange}
                    value={booksPerPage}
                  >
                    <option value="10" selected>
                      10개씩 보기
                    </option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                  </select>
                  <div
                    style={{
                      display: "flex",
                      width: "75px",
                      border: "1px solid #C0C0C0",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <button
                      onClick={() => setViewMode(true)}
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                        borderRight: "1px solid #C0C0C0",
                      }}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_list_active.png"
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => setViewMode(false)}
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                      }}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_img_active.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 키워드 영역 */}
            <div
              style={{
                padding: "15px 0px 15px 0px",
                borderBottom: "1px solid #c4bebe",
              }}
            >
              <ul style={{ display: "flex" }}>
                <SearchKeyword>
                  {/* <div>저주</div> */}
                  저주
                  <button
                    style={{
                      backgroundColor: "#c8edf2",
                      borderRadius: "999px",
                      lineHeight: "5px",
                    }}
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </SearchKeyword>
              </ul>
            </div>

            {/* 콘텐츠 영역 */}
            <div>
              {viewMode ? (
                <ListUIWrap>
                  {/* {books.map((book, index) => ( */}
                  {currentBooks.map((book, index) => (
                    <Link to={`/book-detail/${book.title}`}>
                      <li
                        key={index}
                        style={{
                          height: "310px",
                          display: "flex",
                          padding: "36px 20px",
                          borderBottom: "1px solid #A1A1A1",
                        }}
                      >
                        <img
                          src={book.imageUrl}
                          alt="책 표지 이미지"
                          style={{
                            height: "240px",
                            width: "170px",
                            backgroundColor: "gray",
                            borderRadius: "5px",
                            // objectFit: "cover",
                            border: "1px solid #c0c0c0",
                          }}
                        />
                        <div style={{ padding: "1rem 0px 0px 1rem" }}>
                          <div>
                            <h3
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginBottom: "8px",
                              }}
                            >
                              {book.title}
                            </h3>
                            <h4
                              style={{
                                fontSize: "1rem",
                                color: "gray",
                                marginBottom: "40px",
                              }}
                            >
                              {book.author}
                            </h4>
                          </div>
                          <div style={{ marginBottom: "40px" }}>
                            <ul style={{ display: "flex", flexWrap: "wrap" }}>
                              <BookKeyword
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(
                                    `/search/result/${book.middleCategoryName}`
                                  );
                                }}
                              >
                                {book.middleCategoryName}
                              </BookKeyword>
                              {book.bookKeywordList.map((keyword, index) => {
                                return (
                                  <BookKeyword
                                    key={index}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(
                                        `/search/result/${keyword.name}`
                                      );
                                    }}
                                  >
                                    {keyword.name}
                                  </BookKeyword>
                                );
                              })}
                            </ul>
                          </div>
                          <h1
                            style={{
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            평균 ★{book.rating}{" "}
                            <span style={{ color: "gray" }}>
                              ({reviewCount})
                            </span>
                          </h1>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ListUIWrap>
              ) : (
                <CardUIWrap>
                  {/* {books.map((book, index) => ( */}
                  {currentBooks.map((book, index) => (
                    <Link to={`/book-detail/${book.title}`}>
                      <li key={index} style={{ width: "170px" }}>
                        <div
                          style={{
                            height: "240px",
                            width: "170px",
                            borderRadius: "5px",
                            backgroundColor: "gray",
                            marginBottom: "10px",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={book.imageUrl}
                            alt="책 표지 이미지"
                            style={{
                              width: "100%",
                              height: "100%",
                              // objectFit: "cover",
                              border: "1px solid #c0c0c0",
                            }}
                          />
                        </div>
                        <BookTitle>{book.title}</BookTitle>
                        <h3 style={{ color: "#6B6B6B", marginBottom: "10px" }}>
                          {book.author}
                        </h3>
                        <h1 style={{ marginBottom: "10px" }}>
                          평균 ★{book.rating}{" "}
                          <span style={{ color: "gray" }}>({reviewCount})</span>
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "40px",
                          }}
                        >
                          <img
                            src={starIcon}
                            alt=""
                            style={{
                              width: "20px",
                              marginRight: "5px",
                            }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                        </div>

                        {/* 별 컴포넌트 */}
                      </li>
                    </Link>
                  ))}
                </CardUIWrap>
              )}
            </div>
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={books.length}
              paginate={paginate}
              bookTitle={title}
            />
          </section>
        </ContentsWrap>
      </Main>
    </>
  );
};

export default SearchResult;

const Main = styled.main`
  padding: 48px 52px 0px 52px;
  max-width: 1440px;
  margin: 0 auto;
`;

const SearchInputWrap = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0px 2px 4px #00000033;
  padding: 10px 0px 10px 1rem;
  border-radius: 5px;
  border: 1px solid #b0b0b0;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 40px;
`;

const SelectMenu = styled.select`
  width: 140px;
  font-size: 20px;
  border: none;
  /* padding-left: 10px; */
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  border-left: 1px solid #c0c0c0;
  margin-left: 1rem;
  padding-left: 1rem;
  font-size: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const ContentsWrap = styled.div`
  display: flex;
`;

const ContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const SearchKeyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 29px;
  line-height: 27px;
  padding: 0px 0px 0px 12px;
  background-color: #c8edf2;
  border-radius: 15px;
  margin-right: 10px;
`;

const BookKeyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 29px;
  padding: 0px 12px;
  background-color: #c8edf2;
  border-radius: 15px;
  margin-right: 10px;
`;

const ListUIWrap = styled.ul``;

const CardUIWrap = styled.ul`
  padding: 36px 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const BookTitle = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 원하는 라인 수 */
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
