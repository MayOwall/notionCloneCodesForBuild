export default function SideBarNewDocButton({ target, onButtonClick }) {
  const buttonElement = document.createElement("div");
  buttonElement.classList.add("side-bar__new-doc-button");
  
  //버튼 내부 요소들 render 메서드
  this.innerElementRender = () => {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-xs")

    const phrase = document.createElement("div");
    phrase.innerText = "create new seed";

    buttonElement.appendChild(icon);
    buttonElement.appendChild(phrase);
  };

  //버튼 render 메서드
  this.render = () => {
    this.innerElementRender();
    target.appendChild(buttonElement);
  };
  this.render();

  //버튼 eventlistener 
  //외부 컴포넌트를 변경해야 하기 때문에 이벤트 콜백함수는 밖으로 뺐다.
  buttonElement.addEventListener("click", () => onButtonClick());
};