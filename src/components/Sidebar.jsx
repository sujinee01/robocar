/* Header 햄버거 메뉴 구현 파일 
  - 햄버거 메뉴 클릭 시 화면 우측에서 메뉴 탭 등장
*/
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faRightToBracket,
  faPersonCirclePlus,
  faUser,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import st from "../style/Sidebar.module.css";

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  background-color: #f5f5f5;
  height: 100%;
  width: 200px;
  right: -200px;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  &.open {
    right: 0;
    transition: 0.5s ease;
    box-shadow: -1px 0 100px 0 gray;
  }
`;

/** 햄버거 메뉴 구현 함수 */
function Sidebar({ isOpen, setIsOpen, isLogin, isAdmin }) {
  const outside = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutsie);
    return () => {
      document.removeEventListener("mousedown", handlerOutsie);
    };
  }, []);

  const handlerOutsie = (e) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const logout = () => {
    localStorage.clear();
  };
  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={toggleSide}
        style={{ cursor: "pointer" }}
      />
      <ul>
        {isLogin ? (
          <div>
            <li className={st.user_info}>
              <div className={st.menu_icon}>
                <FontAwesomeIcon icon={faCircleUser} size="2x" />
              </div>
              <div className={st.user_name}>
                {localStorage.getItem("name")} 님
              </div>
            </li>
            <li className={st.menu_item}>
              <a href="/" onClick={logout}>
                <div className={st.menu_icon}>
                  <FontAwesomeIcon icon={faRectangleXmark} />
                </div>
                로그아웃
              </a>
            </li>
          </div>
        ) : (
          <div>
            <li className={st.menu_item}>
              <a href="/login">
                <div className={st.menu_icon}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </div>
                로그인
              </a>
            </li>
            <li className={st.menu_item}>
              <a href="/join">
                <div className={st.menu_icon}>
                  <FontAwesomeIcon icon={faPersonCirclePlus} />
                </div>
                회원가입
              </a>
            </li>
          </div>
        )}
        {isLogin ? (
          isAdmin ? (
            <li className={st.menu_item}>
              <a href="/manage">
                <div className={st.menu_icon}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                관리자 페이지
              </a>
            </li>
          ) : (
            <li className={st.menu_item}>
              <a href="/mypage">
                <div className={st.menu_icon}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                마이 페이지
              </a>
            </li>
          )
        ) : (
          ""
        )}
      </ul>
    </SideBarWrap>
  );
}

export default Sidebar;
