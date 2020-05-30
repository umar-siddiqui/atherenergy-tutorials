**Create new tutorial**

    Creates a tutorial

* **URL**

  /tutorial

* **Method:**

  `POST`

* **Header**

  `Authorization Bearer=[token]`

*  **URL Params**

    `None`

* **Data Params**

   **Required:**

   `content=[string]`
   `title=[string]`
   `author=[string]`
   `status=[string]`

   **Optional:**

   `summary=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "createdAt": 1590844803263, "updatedAt": 1590844803263, "id": 1, "title": "Tut 101", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial" }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Not Found }`

    OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ Forbidden }`

    OR

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/tutorial",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```

----------------------

**Show Tutorials**

    Returns json data about of all the tutorials.

* **URL**

  /tutorial

* **Method:**

  `GET`

* **Header**

  `Authorization Bearer=[token]`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ "createdAt": 1590844803263, "updatedAt": 1590844803263, "id": 1, "title": "Tut 101", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial" }, {"createdAt": 1590847262288, "updatedAt": 1590847262288, "id": 2, "title": "Tut 102", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial"}]`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Not found }`

    OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ Forbidden }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/tutorial/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

----------------------

**Show Tutorial**

    Returns json data about a single tutorial.

* **URL**

  /tutorial/:id

* **Method:**

  `GET`

* **Header**

  `Authorization Bearer=[token]`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "createdAt": 1590844803263, "updatedAt": 1590844803263, "id": 1, "title": "Tut 101", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial" }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Not found }`

    OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ Forbidden }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/tutorial",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

--------------------

**Update a Tutorial**

    Update single tutorial.

* **URL**

  /tutorial/:id

* **Method:**

  `GET`

* **Header**

  `Authorization Bearer=[token]`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  **Optional:**

  `content=[string]`
  `title=[string]`
  `author=[string]`
  `status=[string]`
  `summary=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "createdAt": 1590844803263, "updatedAt": 1590844803263, "id": 1, "title": "Tut 101", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial" }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Not found }`

    OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ Forbidden }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/tutorial/1",
      dataType: "json",
      type : "PUT",
      success : function(r) {
        console.log(r);
      }
    });
  ```

----------------------

**Delete a Tutorial**

    Deletes a single tutorial.

* **URL**

  /tutorial/:id

* **Method:**

  `DELETE`

* **Header**

  `Authorization Bearer=[token]`

*  **URL Params**

   **Required:**

   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "createdAt": 1590844803263, "updatedAt": 1590844803263, "id": 1, "title": "Tut 101", "summary": "", "author": "ABC", "status": "draft", "content": "First tutorial" }`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ Not found }`

    OR

  * **Code:** 403 UNAUTHORIZED <br />
    **Content:** `{ Forbidden }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/tutorial/1",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```