import React from 'react';

import './guide.scss';
import Profile from '../../components/Profile/Profile';

const grays = ['#f5f5f5', '#e5e5e5', '#ccc', '#666', '#333', '#191919'];
const primarys = [
  ['-light', '#D4CDF7'],
  ['', '#8D78DF'],
  ['-dark', '#2E1766'],
];

const writers = [
  { profileColor: 1, profilePattern: 1, name: 'jh' },
  { profileColor: 2, profilePattern: 2, name: 'hd' },
  { profileColor: 3, profilePattern: 3, name: 'ck' },
  { profileColor: 4, profilePattern: 4, name: '홍민' },
  { profileColor: 5, profilePattern: 5, name: '12' },
  { profileColor: 6, profilePattern: 6, name: '1d' },
  { profileColor: 7, profilePattern: 7, name: '홍2' },
  { profileColor: 8, profilePattern: 8, name: '4k' },
  { profileColor: 9, profilePattern: 9, name: 'cc' },
  { profileColor: 10, profilePattern: 10, name: 'aa' },
];

function Guide() {
  return (
    <div className="guide l-wrap">
      <h1 className="h2 page-title">스타일 가이드</h1>
      <h2 className="h4 g-title">colors</h2>
      <div className="colors-box">
        <ul className="colors">
          {grays.map((color, i) => (
            <li
              className="colors__item"
              style={
                i > 2
                  ? { backgroundColor: color, color: '#f5f5f5' }
                  : { backgroundColor: color }
              }
            >
              <span>$gray{i}</span>
              <span>{color}</span>
            </li>
          ))}
        </ul>
        <ul className="colors">
          {primarys.map((color, i) => (
            <li
              className="colors__item"
              style={
                i > 0
                  ? { backgroundColor: color[1], color: '#f5f5f5' }
                  : { backgroundColor: color[1] }
              }
            >
              <span>$primary{color[0]}</span>
              <span>{color[1]}</span>
            </li>
          ))}
        </ul>
        <ul className="colors">
          <li
            className="colors__item"
            style={{ backgroundColor: '#006B1E', color: '#f5f5f5' }}
          >
            <span>$color-confirm</span>
            <span>#156A94</span>
          </li>
          <li
            className="colors__item"
            style={{ backgroundColor: '#B80000', color: '#f5f5f5' }}
          >
            <span>$color-err</span>
            <span>#B80000</span>
          </li>
        </ul>
      </div>

      <h2 className="h4 g-title">heading</h2>
      <div className="heading-box">
        <div className="h">h1</div>
        <div className="h1 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">54px / px</div>
      </div>

      <div className="heading-box">
        <div className="h">h2</div>
        <div className="h2 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">42px / px</div>
      </div>

      <div className="heading-box">
        <div className="h">h2</div>
        <div className="h2 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">42px / px</div>
      </div>
      <div className="heading-box">
        <div className="h">h3</div>
        <div className="h3 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">36px / px</div>
      </div>
      <div className="heading-box">
        <div className="h">h4</div>
        <div className="h4 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">30px / px</div>
      </div>
      <div className="heading-box">
        <div className="h">h5</div>
        <div className="h5 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">24px / px</div>
      </div>
      <div className="heading-box">
        <div className="h">h6</div>
        <div className="h6 cont">그와 청춘에서만 따뜻한 그들에게 칼이다.</div>
        <div className="desc">Noto Sans / 500</div>
        <div className="desc">18px</div>
      </div>

      <h2 className="h4 g-title">랜덤 프로필</h2>
      <div className="profiles">
        {writers.map((writer) => (
          <Profile writer={writer} />
        ))}
      </div>

      <h2 className="h4 g-title">폼</h2>
      <div className="flex-box">
        <div className="item-1of3">
          <div className="form-g">
            <label className="label">email</label>
            <input
              type="email"
              className="input"
              // value={email}
              // onChange={changeEmail}
            />
          </div>
          <div className="form-g">
            <label className="label">password</label>
            <input
              type="password"
              className="input"
              // value={password}
              // onChange={changePassword}
            />
          </div>
        </div>
      </div>

      <h2 className="h4 g-title">버튼 &amp; 링크</h2>
      <div className="flex-box">
        <div className="item-1of3">
          <div className="func">
            <button type="button" className="btn">
              btn
            </button>
            <a href="#" className="btn">
              link-btn
            </a>
          </div>
          <div className="func">
            <button type="button" className="btn btn--lg">
              btn--lg
            </button>
            <a href="#" className="btn btn--lg">
              link-btn--lg
            </a>
          </div>
        </div>
        <div className="item-1of3">
          <div className="func">
            <button type="button" className="btn btn--em">
              btn--em
            </button>
            <button type="button" className="btn btn--em" disabled>
              btn--em-disabled
            </button>
            <button type="button" className="btn" disabled>
              btn-disabled
            </button>
          </div>

          <div className="func">
            <button type="button" className="btn btn--em btn--block btn--lg">
              btn--block--lg
            </button>
          </div>
        </div>
        <div className="item-1of3">
          <a href="#" className="link">링크</a>
        </div>
      </div>
    </div>
  );
}

export default Guide;
