import Header from "./components/Header.js";
import SideBar from "./components/SideBar.js";
import DocEditPage from "./components/docEditPage.js";
import { putDoc } from "./etcs/api.js";
import { initRouter } from "./etcs/router.js";
import Footer from "./components/Footer.js";


export default function App({ target }){
  const appElement = document.createElement("div");
  appElement.classList.add("notion-app");
  target.appendChild(appElement);
  
  //컴포넌트들 호출
  const header = new Header({ target : appElement });

  const sideBar = new SideBar({ target : appElement });
  sideBar.setState();

  const docEditPage = new DocEditPage({ target : appElement });

  const footer = new Footer({ target : appElement });  
  

  //docEditPage 문서 작성시 일어나게 할 event
  this.onEditing = async () => {
    const title = document.querySelector(".edit-page__title");
    const content = document.querySelector(".edit-page__content");
    const [, , id] = window.location.pathname.split("/");
    let timer = null;

    //title, content 모두에게 keyup event 부여
    [ title, content ].forEach(element => element.addEventListener("keyup", () => {
      //디바운싱 처리
      if(timer !== null) {
        clearTimeout(timer);
      };
      timer = setTimeout( async () => {
        await putDoc(`${id}`, {
            "title" : `${title.value || "무제"}`,
            "content" : `${content.innerHTML}`
        });
        sideBar.setState();
      }, 1000);
    }));
  };
  
  //router
  this.route = async () => {
    const { pathname } = window.location;
    //루트로의 접근일시 rootpage 렌더
    if(pathname === "/") {
      docEditPage.rootPageRender();
    //documents로의 접근일 시 editpage 렌더 & 이벤트 부여
    } else if(pathname.indexOf("/documents/") === 0) {
      const [ , , postId] = pathname.split("/");
      docEditPage.editPageRender();
      await docEditPage.editPagesetState(postId);
      await this.onEditing();
    };
  };
  this.route();

  //url이동시 처리될 route
  initRouter(() => this.route());

  
};