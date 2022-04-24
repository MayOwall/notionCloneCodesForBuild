export default function Footer({ target }) {
  const footerElement = document.createElement("div");
  footerElement.classList.add("footer");

  this.footerInnerRender = () => {
    const copyRight = document.createElement("div");
    copyRight.classList.add("footer__copyRight");
    copyRight.innerText = "© mayOwall, 2022";

    const easterEgg = document.createElement("div");
    easterEgg.classList.add("footer__easterEgg");
    easterEgg.innerText = `꽃과 나무를 좋아합니다.`;

    footerElement.appendChild(copyRight);
    footerElement.appendChild(easterEgg);
  };

  this.render = () => {
    this.footerInnerRender();
    target.appendChild(footerElement);
  };

  this.render();
}