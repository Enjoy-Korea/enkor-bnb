# enkor-bnb

✨ [제출물 보러가기](#submission)

## 필수 스택

- Node.js 14 이상
- Express.js
- MySQL or Sqlite
- Typescript or Javascript

## 구현 기능

숙박 플랫폼을 서비스하기 위한 REST API를 구현해야 합니다.

- 회원 기능
  - 회원 가입
  - 로그인
  - 회원 가입 및 로그인은 이메일을 사용합니다.
  - 비밀번호는 암호화 되어야 합니다.
  - JWT만을 이용해 인증기능이 구현되어야 합니다.
- 매물 조회 기능
  - 매물 정보: 타이틀, 주변대학, 매물 타입, 이미지 URL, 설명, 주소, 가격.
  - 사용자는 매물 리스트를 볼 수 있어야 합니다. 페이지네이션이 필요합니다. 리스트에는 타이틀, 주변대학, 이미지, 매물 타입, 가격이 나옵니다.
  - 사용자는 상품 리스트를 가격순으로 정렬할 수 있습니다.
  - 사용자는 상품 상세 정보를 볼 수 있어야 합니다.
- 숙박 예약
  - 사용자는 숙박 시설을 예약할 수 있어야 합니다.
  - 사용자는 예약한 내용을 확인할 수 있어야 합니다.

## 우대사항

- 유닛 테스트
- 문서화

---

# Submission

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# unit test
$ npm run test
```

## Environment variable

| Key            | Required |
| -------------- | -------- |
| PORT           |          |
| DB_HOST        | O        |
| DB_USER        | O        |
| DB_DATABASE    | O        |
| DB_PASSWORD    | O        |
| BCRYPT_SALT    |          |
| JWT_SECRET     | O        |
| JWT_EXPIRES_IN |          |

## Completed feature

- [x] 회원 가입
  - [x] 비밀번호 암호화
- [x] 로그인
  - [x] JWT 인증
- [x] 모든 매물 조회
  - [x] 페이지네이션
  - [x] 가격순 정렬
- [x] 매물 상세 정보 조회
- [x] 숙박 예약
- [x] 예약 내용 조회
- [x] Swagger 문서화
- [x] 유닛 테스트

## API Summary

| URL            | Method | Description |
| -------------- | ------ | ----------- |
| /api-docs | GET | API 문서 조회 |
| /api/users/join | POST | 회원 가입 |
| /api/users/login | POST | 로그인 |
| /api/houses | GET | 모든 매물 조회 |
| /api/houses/{id} | GET | 매물 상세 정보 조회 |
| /api/reservations | POST | 숙박 예약 |
| /api/reservations | GET | 예약 조회 |

## ERD

![ERD](https://user-images.githubusercontent.com/76666857/142267089-6d63da44-486b-4918-9484-a84be610027e.png)
