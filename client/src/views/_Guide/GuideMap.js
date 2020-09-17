import React from 'react';

import './guide.scss';

function Guide() {
  return (
    <div className="l-wrap">
      <h1 className="h1 page-title">코딩맵</h1>
      <table
        summary="가이드 및 페이지 바로가기 링크를 제공"
        className="g-table table"
      >
        <caption className="a11y">페이지 구조 및 링크 확인</caption>
        <thead>
          <tr>
            <th>page</th>
            <th>path</th>
            <th>view</th>
            <th>ect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>디자인 가이드</td>
            <td>/_guide/guide</td>
            <td>
              <a className="link" target="_blank" href="/_guide/guide">
                Guide
              </a>
            </td>
            <td></td>
          </tr>
          <tr className="depth">
            <td>메인 & 리스트</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>메인</td>
            <td>/</td>
            <td>
              <a className="link" target="_blank" href="/">
                Landing
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>구독 영상 모아보기</td>
            <td>/subscription</td>
            <td>
              <a className="link" target="_blank" href="/subscriptiond">
                Subscription
              </a>
            </td>
            <td></td>
          </tr>
          <tr className="depth">
            <td>회원관리</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>회원가입</td>
            <td>/register</td>
            <td>
              <a className="link" target="_blank" href="/register">
                Register
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>로그인</td>
            <td>/login</td>
            <td>
              <a className="link" target="_blank" href="/login">
                Login
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>회원정보수정</td>
            <td>/mypage/:id</td>
            <td>Mypage</td>
            <td></td>
          </tr>
          <tr className="depth">
            <td>비디오</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>비디오 업로드</td>
            <td>/video/upload</td>
            <td>
              <a className="link" target="_blank" href="/video/upload">
                VideoUpload
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>비디오 디테일</td>
            <td>/video/:videoId</td>
            <td>
              <a className="link" target="_blank" href="/video/5f61c4a3d515401b2027d478">
                VideoDetail
              </a>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>비디오 채널</td>
            <td>/channel/:id</td>
            <td>Channel</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Guide;
