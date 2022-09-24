import { NEW_MESSAGE_EVENT } from '../../helpers/consts';
import { LitElement, html, css } from '../base';

export class RoomMessages extends LitElement {
  static get styles() {
    return css`
      ol {
        list-style: none;
        padding: 0 0rem;
        display: flex;
        flex-direction: column;
        gap: 1rem 0;
        min-height: calc(100vh - 300px);
        max-height: calc(100vh - 300px);
        overflow: auto;

        /* scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1); */
        /* scrollbar-width: thin; */
        border-right: 10px solid transparent
      }
    
      ol::-webkit-scrollbar-thumb {
        background:  #c5c5c5;
      }
      ol::-webkit-scrollbar-track {
        background: white;
      }
      ol::-webkit-scrollbar {
        width: 4px;
      }
      ol::-webkit-scrollbar-thumb:hover {
        opacity: 0.7;
      }
    `;
  }

  static get properties() {
    return {
      messages: { type: Array }
    };
  }

  constructor() {
    super();
    this.messages = [];
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(NEW_MESSAGE_EVENT, this._setMessages);
  }

  disconnectedCallback() {
    window.removeEventListener(NEW_MESSAGE_EVENT, this._setMessages);
    super.disconnectedCallback();
  }
  render() {
    return html`<ol>
      ${this.messages.map((message) => html`${SingleMessage(message)}`)}
    </ol>`;
  }

  _setMessages = (event) => {
    if (Array.isArray(event.detail)) {
      this.messages = [...this.messages, ...event.detail];
    }
  };
}
customElements.define('room-messages', RoomMessages);

const SingleMessage = ({ message, userName, userId }) => {
  return html`<li data-user-id=${userId}>
    <div>${message}</div>
    <div>${userName}</div>
  </li> `;
};
