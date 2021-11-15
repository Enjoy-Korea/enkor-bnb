# 🏡 Enkor - bnb

## 🛠 프로젝트 빌드 및 서버 실행 방법

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/heejin99/enkor-bnb.git
```

2. 패키지를 설치합니다.

```
$ npm install
```

3. 서버를 실행해 줍니다.

```
$ npm start
```

4. 정해진 API에 접근하여 서비스를 이용합니다.

<br>

## 📝 과제 요구사항

<br>

#### **과제 제출 방식**

-   main 브랜치에 PR 해주세요.

#### **필수 스택**

-   Node.js 14 이상
-   Express.js
-   MySQL or Sqlite
-   Typescript or Javascript

#### **구현 기능**

숙박 플랫폼을 서비스하기 위한 REST API를 구현해야 합니다.

-   회원 기능
    -   회원 가입
    -   로그인
    -   회원 가입 및 로그인은 이메일을 사용합니다.
    -   비밀번호는 암호화 되어야 합니다.
    -   JWT만을 이용해 인증기능이 구현되어야 합니다.
-   매물 조회 기능
    -   매물 정보: 타이틀, 주변대학, 매물 타입, 이미지 URL, 설명, 주소, 가격.
    -   사용자는 매물 리스트를 볼 수 있어야 합니다. 페이지네이션이 필요합니다. 리스트에는 타이틀, 주변대학, 이미지, 매물 타입, 가격이 나옵니다.
    -   사용자는 상품 리스트를 가격순으로 정렬할 수 있습니다.
    -   사용자는 상품 상세 정보를 볼 수 있어야 합니다.
-   숙박 예약
    -   사용자는 숙박 시설을 예약할 수 있어야 합니다.
    -   사용자는 예약한 내용을 확인할 수 있어야 합니다.

#### **우대사항**

-   유닛 테스트
-   문서화

<br>

## 🌏 API 설계

[API 설계 노션 링크](https://sticky-cabbage-92f.notion.site/API-759ffdd4a7234d8e9cbd33d8a50b7fd0)

<br>

## 🧬 DB 모델링

![enkor (1) drawio](https://user-images.githubusercontent.com/60311404/141692939-6021d973-22f9-4b4d-8c7c-fab8a57a6b08.png)

<br>

## 🏫 사용 기술

-   Backend : <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/></a> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/></a>
-   DataBase : <img src="https://img.shields.io/badge/MySQL-4479a1?style=flat&logo=MySQL&logoColor=white"/></a> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=Sequelize&logoColor=white"/>
-   Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>

<br>

## 📂 폴더 구조

```
📁 config
└── 📄 config.js
📁 controllers
├── 📄 reservationController.js
├── 📄 roomController.js
└── 📄 userController.js
📁 libs
└── 📄 token.js
📁 models
├── 📄 index.js
├── 📄 reservation.js
├── 📄 room.js
└── 📄 user.js
📁 seeders
└── 📄 20211113125755-test.js
📁 tests
├── 📄 reservationController.test.js
├── 📄 roomController.test.js
└── 📄 userController.test.js
📄 .env
📄 babel.config.js
📄 jest.config.json
📄 houses.sample.json
📄 app.js
📄 package.json
📄 package-lock.json
📄 README.md
📄 router.js
```

<br>

## 🔗 구현 기능

### 1) Check List

-   User

    ✅ 회원가입 API

    ✅ 로그인 API

-   매물 조회

    ✅ 매물 리스트 API

    ✅ 매물 리스트 pagination API

    ✅ 매물 리스트 정렬 API

    ✅ 매물 상세 정보 API

-   예약

    ✅ 숙박 예약 API

    ✅ 예약 정보 API

-   테스트

    ✅ 유닛 테스트

<br>

## 🌈 API

[Postman 주소-링크](https://documenter.getpostman.com/view/14929657/UVC8DS11)

<br>

## 🐾 API Test 방법

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. 정의된 SERVER_URL이 올바른지 확인 합니다. (http://localhost:5000)

![enkorTest](https://user-images.githubusercontent.com/60311404/141655890-85d14cab-d133-415f-a1cd-0a256d85fe42.png)

#### 3. Signup, Signin API를 이용하여 회원가입과 로그인을 진행할 수 있습니다.

![enkorSignup](https://user-images.githubusercontent.com/60311404/141692019-24bc0cbf-b66f-4142-b7df-03b48a4a2f87.png)

#### 4. Room List, Room Info API를 이용하여 매물 리스트와 매물 상세 정보를 확인할 수 있습니다.

![enkorRoomList](https://user-images.githubusercontent.com/60311404/141692027-ce89e3b8-2d03-4cdc-854c-5f17717f7054.png)

##### 매물 리스트 조회 조건

- pageNo: pagination 조건 
  - pageNo를 입력하지 않는 경우에는 첫번째 페이지가 자동으로 보입니다.
  - 1, 2, ... 등 숫자로 입력하면 해당 페이지의 내용이 5개씩 보여집니다.
- sort: 가격순 정렬 조건
  - sort를 입력하지 않는 경우엔 매물이 내림차순으로 보여집니다.
  - sort가 0이면 가격이 내림차순 순서대로 보여집니다.
  - sort가 1이면 가격이 오름차순 순서대로 보여집니다. 



##### Room Info API

- id는 roomsId 입니다.



#### 5. Reservation Book, Reservation Info API를 이용하여 매물 예약 진행과 예약 확인 정보를 확인할 수 있습니다.

![enkorReservation](https://user-images.githubusercontent.com/60311404/141692034-c248876f-925c-4496-b866-825f5cdef424.png)

##### Reservation Book API

- id는 reservation id 입니다.
- Headers의 Authorization 에 token 값을 넣습니다.

##### Reservation Info API

- id는 reservation id 입니다.
- Headers의 Authorization 에 token 값을 넣습니다.