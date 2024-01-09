import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import App from "./../App";

const LoginContainer = styled.div`
  display: flex;
  color: black;
`;

const ImageContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  background-image: url("https://d3udu241ivsax2.cloudfront.net/v3/images/login/promotion_intro_bg.ac5237a5bed49b864cccee5224a464e4.jpg");
  background-image: url("https://www.flybook.kr/FlyBookSitePublishing/assets/img/main/top-banner.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  height: 100%;
  background: #fff;
  padding: 136px 118px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 77px;
`;

const InputWrap = styled.div`
  margin-bottom: 15px;
  position: relative;
  p {
    font-size: 20px;
    font-weight: 300;
  }
`;

const InputWrap2 = styled.div`
  display: flex;
  margin-bottom: 15px;
  p {
    font-size: 20px;
    font-weight: 300;
  }
`;

const ErrorMessageWrap = styled.div`
  color: red;
  margin-top: 5px;
`;

const InputDelete = styled.button`
  position: absolute; /* X 버튼을 absolute로 설정 */
  right: 20px; /* 오른쪽 여백 조절 */
  top: 50%; /* 세로 중앙 정렬을 위해 50%로 설정 */
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: ${({ showDeleteButton }) => (showDeleteButton ? "block" : "none")};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 75%;
  height: 56px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 75px;
  background: #888888;
  color: #fff;
  font-size: 32px;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: ${({ isButtonEnabled }) => isButtonEnabled ? "pointer" : "not-allowed"};
`;

const BirthInput = styled.div`
  width: 50%;

  input {
    font-size: 20px;
    margin-top: 10px;
    width: 90%;
    height: 40px;
    border: 1px solid #ccc;
    padding: 0px 10px;
  }
`;

const GenderInput = styled.div`
  width: 50%;
  p {
    margin-left: 20px;
  }
`;

const GenderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  form {
    width: 100%;
  }
  button {
    margin: 10px 20px 0px;
    /* padding: 10px 20px; */
    font-size: 20px;
    border: 1px solid #d9d9d9;
    color: black;
    border-radius: 4px;
    height: 40px;
    width: 95px;
  }
`;

const EmailWrap = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 50%;
    height: 56px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 20px;
    padding: 10px;
    margin-right: 10px;
  }
`;

const AtSymbol = styled.p`
  width: auto;
  line-height: 56px;
  text-align: center;
  margin-right: 10px;
`;

const EmailSelect = styled.select`
  width: 50%;
  height: 56px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 20px;
  padding: 10px;
`;

const EmailVerifyButton = styled.button`
  width: 20%;
  height: 56px;
  background: #d9d9d9;
  color: black;
  font-size: 20px;
  /* font-weight: bold; */
  border: none;
  border-radius: 4px;
  margin-left: 25px;
`;

const HalfWidthInput = styled(Input)`
  width: 34%;
`;

const VerifyButton = styled(EmailVerifyButton)`
  width: 15%;
`;

const JobSelect = styled.select`
  margin-top: 10px;
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 20px;
`;

export const Join2 = () => {
  // 아이디 및 아이디 중복 확인
  const [id, setId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(true);

  // 비밀번호 및 비밀번호 확인, 일치 여부
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // 이름인데 필요한가? 어디에 활용하는거지?
  const [name, setName] = useState("");

  // 닉네임 및 닉네임 중복 확인
  const [nickname, setNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  // 생년월일, 성별, 성별 버튼 클릭 판단
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [isMaleClicked, setIsMaleClicked] = useState(false);
  const [isFemaleClicked, setIsFemaleClicked] = useState(false);

  // 이메일 및 이메일 유저이름과 도메인
  const [email, setEmail] = useState("");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  // 모든 것을 작성해야 가입하기 버튼 클릭 활성화
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  // 입력 이벤트
  const handleInputChange = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    } else if (e.target.name === "password") {
      setPwd(e.target.value);
    } else if (e.target.name === "passwordConfirm") {
      setPwdConfirm(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "nickname") {
      setNickname(e.target.value);
    } else if (e.target.name === "birthDate") {
      setBirthDate(e.target.value);
    } else if (e.target.name === "gender") {
      setGender(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    // 비밀번호 일치 여부 확인
    if (e.target.name === "password" || e.target.name === "passwordConfirm") {
      const isMismatched = pwd !== pwdConfirm;
      setPasswordMismatch(isMismatched);
    }
  };

  const handleBlurPasswordConfirm = () => {
    // 비밀번호 확인 필드에서 focus가 떠날 때 비밀번호 일치 여부 확인
    const isMismatched = pwd !== pwdConfirm;
    if (isMismatched) {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  // 입력의 X 버튼 이벤트
  const handleDeleteButtonClick = (inputType) => {
    if (inputType === "id") {
      setId("");
    } else if (inputType === "password") {
      setPwd("");
    } else if (inputType === "passwordConfirm") {
      setPwdConfirm("");
    } else if (inputType === "name") {
      setName("");
    } else if (inputType === "nickname") {
      setNickname("");
    } else if (inputType === "birthDate") {
      setBirthDate("");
    } else if (inputType === "gender") {
      setGender("");
    } else if (inputType === "email") {
      setEmail("");
    }
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleGenderButtonClick = (gender) => {
    if (gender === "male") {
      setIsMaleClicked(true);
      setIsFemaleClicked(false);
    } else if (gender === "female") {
      setIsMaleClicked(false);
      setIsFemaleClicked(true);
    }
  };

   const handleEmailDirectInput = (e) => {
     const input = e.target.value;
     setEmailUsername(input);
   };

   const handleEmailInputChange = (e) => {
     const selectedDomain = e.target.value;
     setEmailDomain(selectedDomain);

     // 선택된 옵션이 "직접 입력"이 아닌 경우에만 사용자 이름을 업데이트
     if (selectedDomain !== "type") {
       setEmailDomain(e.target.value);
     } else {
        setEmailDomain("");
     }
   };
  
  return (
    <LoginContainer>
      <ImageContent></ImageContent>
      <LoginContent>
        <Title>책국 회원가입</Title>

        <InputWrap2>
          <Input
            type="text"
            name="id"
            placeholder="아이디"
            value={id}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={id.length > 0}
            onClick={() => handleDeleteButtonClick("id")}
          >
            X
          </InputDelete>
          <VerifyButton>중복 확인</VerifyButton>
        </InputWrap2>

        <InputWrap>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={pwd.length > 0}
            onClick={() => handleDeleteButtonClick("password")}
          >
            X
          </InputDelete>
        </InputWrap>
        <InputWrap>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={pwdConfirm}
            onChange={handleInputChange}
            // onBlur={handleBlurPasswordConfirm}
          />
          <InputDelete
            showDeleteButton={pwdConfirm.length > 0}
            onClick={() => handleDeleteButtonClick("passwordConfirm")}
          >
            X
          </InputDelete>
          {passwordMismatch && (
            <ErrorMessageWrap>비밀번호가 일치하지 않습니다.</ErrorMessageWrap>
          )}
        </InputWrap>
        {/* <ErrorMessageWrap>
          영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
        </ErrorMessageWrap> */}

        <InputWrap>
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={name}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={name.length > 0}
            onClick={() => handleDeleteButtonClick("name")}
          >
            X
          </InputDelete>
        </InputWrap>

        <InputWrap2>
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={nickname.length > 0}
            onClick={() => handleDeleteButtonClick("nickname")}
          >
            X
          </InputDelete>
          <VerifyButton>중복 확인</VerifyButton>
        </InputWrap2>
        <InputWrap2>
          <BirthInput>
            <p>생년월일</p>
            <input
              type="date"
              max="9999-12-31"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
          </BirthInput>
          <GenderInput>
            <p>성별</p>
            <GenderWrap>
              <form>
                <button
                  type="button"
                  value="male"
                  onClick={() => handleGenderButtonClick("male")}
                  style={{
                    backgroundColor: isMaleClicked ? "#D9D9D9" : "#fff",
                    color: isMaleClicked ? "black" : "#D9D9D9",
                  }}
                >
                  남성
                </button>
                <button
                  type="button"
                  value="female"
                  onClick={() => handleGenderButtonClick("female")}
                  style={{
                    backgroundColor: isFemaleClicked ? "#D9D9D9" : "#fff",
                    color: isFemaleClicked ? "black" : "#D9D9D9",
                  }}
                >
                  여성
                </button>
              </form>
            </GenderWrap>
          </GenderInput>
        </InputWrap2>

        <InputWrap2>
          <EmailWrap>
            <input
              type="text"
              placeholder="이메일 입력"
              value={emailUsername}
              onChange={handleEmailDirectInput}
            />
            <AtSymbol>@</AtSymbol>
            <input
              type="text"
              value={emailDomain}
              // readOnly={emailDomain !== "type"}
            />
            <EmailSelect name="" id="" onChange={handleEmailInputChange}>
              <option value="type" selected>
                직접 입력
              </option>
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </EmailSelect>
          </EmailWrap>
          <EmailVerifyButton>인증하기</EmailVerifyButton>
        </InputWrap2>

        <InputWrap>
          <HalfWidthInput
            type="text"
            placeholder="인증번호 입력"
          ></HalfWidthInput>
          <VerifyButton>인증</VerifyButton>
        </InputWrap>

        <InputWrap>
          <p>직업 선택</p>
          <JobSelect name="" id="">
            <option value="0" selected>
              선택 없음
            </option>
            <option value="학생">학생</option>
            <option value="직장인">직장인</option>
            <option value="전문직">전문직</option>
            <option value="자영업">자영업</option>
            <option value="프리랜서">프리랜서</option>
            <option value="무직">무직</option>
          </JobSelect>
        </InputWrap>

        <LoginButton isButtonEnabled={isButtonEnabled}>가입하기</LoginButton>
      </LoginContent>
    </LoginContainer>
  );
};
