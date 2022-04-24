export const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

//request 함수
export const requestDoc = async(url) => {
  try {
    const response = await fetch(`${API_END_POINT}/${url}`,{
      method : "GET",
      headers : {
        "x-username" : "mayOwall",
        "Content-type" : "application/json"
      }
    });
    if(response.ok) {
      return await response.json();
    };

    throw new Error("request 도중 400/500대의 에러가 발생하였습니다.");
  } catch(e) {
    alert(e.message);
  };
};

//post 함수
export const postDoc = async(content) => {
  try{
    const response = await fetch(`${API_END_POINT}/documents`, {
      method : "POST",
      headers : {
        "x-username" : "mayOwall",
        "Content-type" : "application/json"
      },
      body : JSON.stringify(content)
    });
    if(response.ok) {
      return await response.json();
    };
  } catch(e) {
    alert(e.message);
  }
};

//put 함수
export const putDoc = async(id, content) => {
  try{
    await fetch(`${API_END_POINT}/documents/${id}`, {
      method : "PUT",
          headers : {
            "x-username" : "mayOwall",
            "Content-type" : "application/json"
          },
          body : JSON.stringify(content)
    });
  } catch(e) {
    alert(e.message);
  };
};

//delete 함수
export const deleteDoc = async(id) => {
  try{
    await fetch(`${API_END_POINT}/documents/${id}`, {
      method : "DELETE",
      headers : {
        "x-username" : "mayOwall",
      },
    });
  } catch(e) {
    alert(e.message);
  };
};