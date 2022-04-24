import { requestDoc, postDoc, deleteDoc } from "../etcs/api.js";
import { push } from "../etcs/router.js";

//사실 이 컴포넌트는 아직 저에게 지옥입니다...어디서 어떤 메커니즘으로 돌아가는지 정리를 잘 못했습니다...추후에 수정 할 계획입니다ㅜ
export default function SideBarDocTree({ target, initialState }){

  const sideBarDocTreeElement = document.createElement("div");
  sideBarDocTreeElement.classList.add("dom-tree");
  target.appendChild(sideBarDocTreeElement);

  //this.state 역할을 하지만 어딘가에서부터 방향이 이상해진 변수들.
  //this.state와 stack의 역할을 동시에 한다.
  let arrStack = [initialState];
  let arrParentStack = [sideBarDocTreeElement];

  //외부 값을 통해 새로 sidebar를 re render 해 줄 메서드.
  //sidebar처럼 그냥 내부 자체적으로 request로 처리할지 고민중이다.
  //sidebar는 render시 안깜빡이고 doctree는 render시 깜빡이는데, 알고리즘이 복잡해서 그런걸까, 아니면 내부 자체적으로 request를 안해서 그런걸까.
  this.setState = (nextState) => {
    sideBarDocTreeElement.innerHTML = ``;
    arrStack = [nextState];
    this.render();
  };
  
  //sidebar의 doctree를 구현히주는 알고리즘.
  //이딴걸 알고리즘이란 이름을 붙여도 될지 모르겠다.
  this.renderAlgorithm = () => {
    let currentArr = arrStack.pop();
    if(arrParentStack.length === 0) {
      arrParentStack.push(sideBarDocTreeElement);
    };
    const currentRoot = arrParentStack.pop();
    const arr = currentArr;

    if(Array.isArray(arr)) {
      for(const data of arr) {

        const node = document.createElement("div");
        // node.innerHTML = `${data.title}<button class="add-button">+</button><button class="delete-button">-</button>`
        if(data.title.length > 7) {
          data.title = data.title.slice(0, 7) + "...";
        }
        node.innerText = `· ${data.title}`;
        node.classList.add("sidebar__doc");
        node.setAttribute("data-id", data.id);
        node.setAttribute("data-title", data.title);
        node.style.paddingLeft = "15px";

        const addButton = document.createElement("button");
        addButton.innerHTML = `<i class="fa-solid fa-plus fa-xs"></i>`;
        addButton.classList.add("add-button");

        const delButton = document.createElement("button");
        delButton.innerHTML = `<i class="fa-solid fa-minus fa-xs"></i>`;
        delButton.classList.add("delete-button");

        node.appendChild(delButton);
        node.appendChild(addButton);

        currentRoot.appendChild(node);

        currentArr = currentArr.slice(1);

        if(data.documents.length !== 0) {
          arrParentStack.push(currentRoot);
          arrParentStack.push(node);

          arrStack.push(currentArr);
          arrStack.push(data.documents);

          this.renderAlgorithm();
          break;
        }
      }
    }

  };

  //렌더된 Doctree에서 사용될 이벤트들.
  const docTreeAddEvent = () => {
    const addButton = document.querySelectorAll(".sidebar__doc .add-button");
    addButton.forEach(each => each.addEventListener("click", async (e) => {
      e.stopPropagation();
        const docElement = e.target.closest("div");
        const { id } = docElement.dataset;
        const content = {
          "title" : "무제",
          "parent" : id
        };

        const postdoc = await postDoc(content);
        document.querySelector(".dom-tree").innerHTML = ``;
        arrParentStack = [sideBarDocTreeElement];
        await requestDoc("documents").then(data => this.setState(data));

        push(`/documents/${postdoc.id}`);

      })
    );
  };
  const docTreeDeleteEvent = () => {
    const deleteButton = document.querySelectorAll(".sidebar__doc .delete-button");
    deleteButton.forEach(button => button.addEventListener("click", async (e) => {
      e.stopPropagation();
      const docElement = e.target.closest("div");
      const warning = confirm(`        정말 이 문서 "${docElement.dataset.title}" 을(를) 삭제하시겠습니까?
      한번 삭제하면 돌이킬 수 없습니다.`);

      if(warning) {
        const { id } = docElement.dataset;
        
        await deleteDoc(id);
        document.querySelector(".dom-tree").innerHTML = ``;
        arrParentStack = [sideBarDocTreeElement];
        await requestDoc("documents").then(data => this.setState(data));
        push("/");
      };
    }))
  };
  const docRouter = async () => {
    const docTitles = document.querySelectorAll(".sidebar__doc");
    docTitles.forEach(docTitle => docTitle.addEventListener("click", async (e) => {
      e.stopPropagation();
      const docTitleElement = e.target.closest("div");
      if(docTitleElement) {
        const { id } = docTitleElement.dataset;
        push(`/documents/${id}`);

        const docData = await requestDoc(`documents/${id}`);
        document.querySelector(".edit-page__title").value = docData.title;
        document.querySelector(".edit-page__content").innerText = docData.content;
      }
    }))
  };

  //sidebar doctree를 render하는 메서드
  //stack이 차 있는 한 renderAlgorithm을 반복하도록 설정해주었다.
  this.render = () => {
    while(arrStack.length > 0) {
      this.renderAlgorithm();
    };
    //event 추가
    docTreeAddEvent();
    docTreeDeleteEvent();
    docRouter();
  };
  
  //request받은 데이터에 document가 하나도 없을 때를 위해 만든 렌더 메서드.
  this.blankDataRender = () => {
    const alert = document.createElement("div");
    alert.classList.add("blank-data-alert");
    alert.innerText = `아래의 버튼을 통해
    당신만의 새 이야기를
    심어보세요 🌱`;
    sideBarDocTreeElement.appendChild(alert);
  }
}