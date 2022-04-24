import SideBarDocTree from "./SideBarDocTree.js";
import SideBarNewDocButton from "./SideBarNewDocButton.js";
import { requestDoc, postDoc } from "../etcs/api.js";
import { push } from "../etcs/router.js"

export default function SideBar({ target }) {
  //sidebar 컴포넌트 생성
  const sideBarElement = document.createElement("div");
  sideBarElement.classList.add("sidebar");

  //sidebar doctree 컴포넌트 호출
  const sideBarDocTree = new SideBarDocTree({
    target : sideBarElement,
    initialState : []
  });

  new SideBarNewDocButton({
    target : sideBarElement,
    onButtonClick : () => {
        postDoc({
          "title" : "무제",
          "content" : ""
        })
        .then(data => push(`/documents/${data.id}`))
        .then(() => this.setState())
        }
  });

  //sidebar 상태 변화 & 렌더 역할의 함수
  this.setState = () => {
    requestDoc("documents")
    .then(data => {
      if(data.length === 0) {
        sideBarDocTree.blankDataRender();
        return
      }
      sideBarDocTree.setState(data)
    })
    .then(this.render());
  };

  this.render = () => {
    target.appendChild(sideBarElement);
  };
}
