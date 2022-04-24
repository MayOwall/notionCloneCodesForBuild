import { requestDoc } from "../etcs/api.js";

export default function DocEditPage({ target }) {

  //docEditPage 컴포넌트 생성
  const pageElement = document.createElement("div");
  pageElement.classList.add("doc-edit-page");

  //root 페이지 내부 요소들 render 메서드
  const rootInnerRender = ({ target }) => {
    const image = document.createElement("img");
    image.classList.add("root-page__image");
    image.setAttribute("src", "/img/seed.png");

    const phrase = document.createElement("div");
    phrase.classList.add("root-page__phrase");
    phrase.innerText = "노트를 만들고 당신만의 이야기를 심어보세요.";

    target.appendChild(image);
    target.appendChild(phrase);
  };

  //root 페이지용 render 메서드
  this.rootPageRender = () => {
    pageElement.innerHTML = ``;
    const rootPageElement = document.createElement("div");
    rootPageElement.classList.add("root-page");

    rootInnerRender({ target : rootPageElement });
    pageElement.appendChild(rootPageElement);
    target.appendChild(pageElement);
  };

  
  //edit 페이지용 render aptjem
  this.editPageRender = () => {
    pageElement.innerHTML = ``;

    const editPageElement = document.createElement("div");
    editPageElement.classList.add("edit-page");

    const title = document.createElement("input");
    title.classList.add("edit-page__title");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "제목을 입력하세요");
    
    const content = document.createElement("div");
    content.classList.add("edit-page__content");
    content.setAttribute("contenteditable", "true");
    content.setAttribute("placeholder", "내용을 입력 해 보세요");

    editPageElement.appendChild(title);
    editPageElement.appendChild(content);

    pageElement.appendChild(editPageElement);
    target.appendChild(pageElement);
  };

  //url id 변화에 따른 editpage 상태 변화 메서드
  //contenteditable 특성 때문에 html 태그들이 innerHTML에 그대로 랜더링 되는 버그가 있음. 추후 수정 예정.
  this.editPagesetState = async (id) => {
    const data = await requestDoc(`documents/${id}`);
    if(data) {
      document.querySelector(".edit-page__title").value = data.title;
      document.querySelector(".edit-page__content").innerHTML = data.content;
    };
  };


}