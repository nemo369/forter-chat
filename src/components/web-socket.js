import config from '../config';
import {
  ALL_MEMBERS_EVENT,
  MY_INFO_EVENT,
  NEW_INPUT_EVENT,
  NEW_MESSAGE_EVENT
} from '../helpers/consts';
import { LitElement, html, css } from './base';
export class WebSocketCmp extends LitElement {
  static get styles() {
    return css`
      .ws-bar {
        --color-status: white;
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 2rem;
        max-width: 2rem;
        height: 2rem;
        border-radius: 100%;
        background-color: var(--color-status);
        color: var(--color-status);
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
        padding: 4px 6px;
        box-sizing: border-box;
      }
      .ws-bar:hover {
        max-width: 10rem;
        width: 10rem;
        border-radius: 24px;
        color: white;
      }
      .ws-bar.open {
        --color-status: #00d894;
      }
      .ws-bar.close {
        --color-status: #ff9fa1;
      }
      .ws-bar.not-connected {
        --color-status: #fad988;
      }
      .more-info {
        opacity: 0;
        transition-delay: 0s;
        transition: none;
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .more-info .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .more-info .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ws-bar:hover .more-info {
        opacity: 1;
        transition: all 0.3s ease-in-out;
        transition-delay: 0.3s;
      }
    `;
  }
  static get properties() {
    return {
      ws: Object,
      wsStatus: String,
      currentUser: Object | null
    };
  }

  url = 'ws://localhost:7071'; // TODO: make this configurable from .env
  constructor() {
    super();
    this.wsStatus = 'not-connected';
    this.currentUser = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(NEW_INPUT_EVENT, this._sendNewMessage);
    window.removeEventListener(MY_INFO_EVENT, this._setUser);
  }

  // Lit method
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(MY_INFO_EVENT, this._setUser);
    window.addEventListener(NEW_INPUT_EVENT, this._sendNewMessage);

    try {
      this.ws = null;
      this.ws = new window.WebSocket(this.url);
      this._setListeners();
    } catch (error) {
      // TODO
      this.ws = null;
      this.wsStatus = 'error';
      // this._dispatchMsg('ws-error', error)
    }
  }

  _onOpen(event) {
    this.wsStatus = event.type;
  }

  _onClose() {
    this.wsStatus = 'close';
  }
  _onMessage = (event) => {
    if (event.data) {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'new-user':
          window.dispatchEvent(
            new CustomEvent(ALL_MEMBERS_EVENT, { detail: data.payload })
          );
          break;
        case 'new-message':
          window.dispatchEvent(
            new CustomEvent(NEW_MESSAGE_EVENT, { detail: data.payload })
          );
          break;
        case 'my-info':
          config.me = data.payload;
          window.dispatchEvent(
            new CustomEvent(MY_INFO_EVENT, { detail: data.payload })
          );
          break;
      }
    }
  };
  _onError() {
    this.wsStatus = 'error';
  }

  _setListeners() {
    if (this.ws) {
      // bind WebSocket events to component events
      this.ws.addEventListener('open', this._onOpen.bind(this));
      this.ws.addEventListener('close', this._onClose.bind(this));
      this.ws.addEventListener('message', this._onMessage.bind(this));
      this.ws.addEventListener('error', this._onError.bind(this));
    }
  }

  render() {
    return html`<div class="${this.wsStatus} ws-bar">
      ${this.currentUser
        ? html`<div class="more-info">
          <div class="avatar">
            <img
              src="${this.currentUser.userAvatar}"
              width="30"
              height="30"
              alt="${this.currentUser.id}"
            /></div>
            <div>${this.currentUser?.userName}</div>
          </div>
        </div>`
        : ''}
    </div>`;
  }

  _sendNewMessage = (event) => {
    if (this.ws?.readyState === 1) {
      this.ws.send(JSON.stringify({ message: event.detail }));
    }
  };
  _setUser = (event) => {
    this.currentUser = { ...event.detail };
  };
}
customElements.define('web-socket', WebSocketCmp);
