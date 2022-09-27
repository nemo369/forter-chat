import { NEW_INPUT_EVENT } from '../../helpers/consts';
import { LitElement, html, css } from '../base';
import { Send } from '../svgs/send.svg';

export class RoomInput extends LitElement {
  static get styles() {
    return css`
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
      :host form:not(.sending) button:hover .send-svg {
        transform: rotate(-15deg);
      }
      :host button {
        padding-right: 32px;
        transition: all 0.3s ease;
        background: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        height: 100%;
        right: 0;
        overflow: hidden;
      }

      .send-svg {
        transition: all 0.5s ease-in-out;
        transform-origin: bottom left;
      }

      .sending .send-svg {
        transform: translateX(100px) rotate(35deg);
      }

      input::placeholder {
        color: var(--bg-color-dark);
      }
    `;
  }
  constructor() {
    super();
  }
  static get properties() {
    return {
      isSending: { type: Boolean }
    };
  }

  render() {
    return html`<form
      class="chat-input flex ${this.isSending ? 'sending' : ''}"
      @submit="${this.onsubmit}"
    >
      <input
        type="text"
        placeholder="Bark your message here.."
        name="input"
        required
      />
      <button type="submit" title="submit">${Send()}</button>
    </form>`;
  }

  onsubmit(e) {
    e.preventDefault();
    const sendEnd = () => {
      this.isSending = false;
      this.renderRoot
        .querySelector('button')
        .removeEventListener('transitionend', sendEnd);
    };

    const detail = this.renderRoot.querySelector('input').value;
    if (detail) {
      window.dispatchEvent(
        new CustomEvent(NEW_INPUT_EVENT, {
          detail
        })
      );
      this.renderRoot.querySelector('input').value = '';
      this.renderRoot
        .querySelector('button')
        .addEventListener('transitionend', sendEnd);
      this.isSending = true;
    }
  }
}
customElements.define('room-input', RoomInput);
