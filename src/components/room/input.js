import { NEW_INPUT_EVENT } from '../../helpers/consts';
import { LitElement, html, css } from '../base';

export class RoomInput extends LitElement {
  static get styles() {
    return css`
      :host form{
        display: flex;
        border:0;
        border:1px solid black;
        border-radius:0.2em;
      }
      :host input{
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        background:transparent;
        border: none;
      }
      :host button:hover{
        background-color: #ddd;
        transition:all 0.3s ease;
      }
      :host button{
        background:transparent;
        border: none;
        cursor: pointer;
      }
    `;
  }
  // constructor() {
  //   super();
  // }

  render() {
    return html`<form class="chat-input flex" @submit="${this.onsubmit}">
      <input type="text" placeholder="Type your message here" name="input"/>
      <button type="submit">Submit</button>
    </form>`;
  }

  onsubmit(e) {
    e.preventDefault();
    const detail = this.renderRoot.querySelector('input').value
    window.dispatchEvent(
      new CustomEvent(NEW_INPUT_EVENT, {
        detail,
      })
    );
    this.renderRoot.querySelector('input').value =''
  }
}
customElements.define('room-input', RoomInput);
