export const inputCss = `
:host form {
  display: flex;
  font-size: 1.2rem;
  position: relative;
}

:host input {
  box-shadow: 0 4px 0 #141414;
  transition-property: box-shadow, transform;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  will-change: box-shadow, transform;
  border: 2px solid var(--bg-color-dark);
  border-radius: 32px;
  padding: 16px 24px;
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
  transition: box-shadow 0.3s ease;
}
:host input:focus {
  box-shadow: 0 0px 0 #141414;
}
:host button:hover .send-svg {
  transform: rotate(-15deg);
}
  transform: translateX(100px) rotate(35deg);
}
`;
