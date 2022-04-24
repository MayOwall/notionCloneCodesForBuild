export default function Header( { target }) {
  const headerElement = document.createElement("div");
  headerElement.classList.add("header");

  //header 내부 요소들을 render하는 역할의 메서드.
  this.headerInnerRender = () => {
    const title = document.createElement("h1");
    title.classList.add("header__title");
    title.innerText = "Green Lover's Note";

    const label = document.createElement("img");
    label.classList.add("header__label");
    label.setAttribute("src", "/img/greenAesthethic.jpeg");

    const headerEaster = document.createElement("img");
    headerEaster.classList.add("header__easter");
    headerEaster.setAttribute("src", "/img/codama.png");

    headerElement.appendChild(title);
    headerElement.appendChild(label);
    headerElement.appendChild(headerEaster);
  };

  //header를 렌더링하는 메서드
  this.render = () => {
    this.headerInnerRender();
    target.appendChild(headerElement);
  };
  this.render();
}