import config from '../../config';
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
        gap: 24px 0;
        min-height: calc(100vh - 300px);
        max-height: calc(100vh - 300px);
        overflow: auto;

        /* scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1); */
        /* scrollbar-width: thin; */
        border-right: 10px solid transparent;
        padding-bottom: 3vh;
      }

      ol::-webkit-scrollbar-thumb {
        background: #c5c5c5;
      }
      ol::-webkit-scrollbar-track {
        background: white;
      }
      ol::-webkit-scrollbar {
        width: 2px;
      }
      ol::-webkit-scrollbar-thumb:hover {
        opacity: 0.7;
      }

      .message {
        display: flex;
        gap: 0 8px;
        margin-right: 24px;
      }
      .message__avatar {
        width: 0.5rem;
        height: 0.5rem;
        flex-shrink: 0;
        border-radius: 100%;
      }
      .message__inner {
        background-color: white;
        padding: 12px 32px 12px 12px;
        border-radius: 0 12px 12px 12px;
        box-shadow: rgb(223 223 223 / 39%) 1px 3px 2px 1px;
      }
      .message__text {
        padding-bottom: 12px;
      }
      .message-text.me {
        margin-left: auto;
        flex-direction: row-reverse;
      }
      .message-text.me .message__inner {
        border-radius: 12px 0px 12px 12px;
        /* box-shadow: 0 0 1px 1px #fff, 0 0 1px 1px #f0f, 0 0 1px 1px #0ff; */
      }

      .message__username {
        font-size: 0.75em;
        font-weight: 600;
        color: #8a92a0;
      }
      .message-bot .message__inner {
        border: 1px solid white;
        background-color: var(--bg-color-dark);
        color: white;
        box-shadow: rgb(155 155 155 / 39%) 1px 3px 2px 1px;

        /* background-image: radial-gradient(
          100.14% 108.7% at 109.58% 35%,
          #8690a6 0,
          #d5d5d6 100%
        ); */
      }
      .message__service {
        width: max-content;
        margin: 0 auto;
        padding: 6px 32px;
        background-color: white;
        border-radius: 24px;
        box-shadow: rgb(223 223 223) 1px 3px 2px 1px;
        font-size: 0.75em;
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
  updated = (name) => {
    this._scrollDown();
  };

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

  _scrollDown = () => {
    if (this.shadowRoot.querySelector('ol')) {
      this.shadowRoot.querySelector(
        'ol'
      ).scrollTop = this.shadowRoot.querySelector('ol').scrollHeight;
    }
  };
}
customElements.define('room-messages', RoomMessages);

const SingleMessage = ({ message, userName, userId, type, userColor }) => {
  if (type === 'SERVICE') {
    return html`<li>
      <div class="message__service">
        <div>${message}</div>
      </div>
    </li>`;
  }

  // if the message is a text message, convert to ENUM in real life
  return html`<li
    data-user-id=${userId}
    class="message message-text ${userId === config.me ? 'me' : ''} ${type ===
    'BOT'
      ? 'message-bot'
      : ''}"
  >
    <div
      style="background:hsl(${userColor},60%, 60%)"
      class="message__avatar"
    ></div>
    <div class="message__inner">
      <div class="message__text">${message}</div>
      <div class="message__username">${userName}</div>
    </div>
  </li>`;
};
