import {
  ALL_MEMBERS_EVENT,
  NEW_INPUT_EVENT,
  NEW_MESSAGE_EVENT
} from '../helpers/consts';
import { LitElement, html, css } from './base';

export class WebSocketCmp extends LitElement {
  static get styles() {
    return css`
      :host div {
        --color-status: white;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        background-color: var(--color-status);
        color: var(--color-status);
        overflow: hidden;
      }
      :host div.open {
        --color-status: #00d894;
      }
      :host div.close {
        --color-status: #ff9fa1;
      }
      :host div.not-connected {
        --color-status: #fad988;
      }
    `;
  }
  static get properties() {
    return {
      ws: Object,
      wsStatus: String
    };
  }

  url = 'ws://localhost:7071'; // TODO: make this configurable from .env
  constructor() {
    super();
    this.wsStatus = 'not-connected';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(NEW_INPUT_EVENT, this._sendNewMessage);
  }

  // Lit method
  connectedCallback() {
    super.connectedCallback();
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
    return html`<div class="${this.wsStatus}">WS</div>`;
  }

  _sendNewMessage = (event) => {
    if (this.ws?.readyState === 1) {
      this.ws.send(JSON.stringify({ message: event.detail }));
    }
  };
}
customElements.define('web-socket', WebSocketCmp);
