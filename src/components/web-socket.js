import {LitElement, html,css} from './base';

export class WebSocketCmp extends LitElement {
  static get styles () {
		return css`
      :host {
        --color-status:green;
        position:fixed;
        bottom:1rem;
        right:1rem;
        width:2rem;
        height:2rem;
        border-radius:100%;
        background-color:var(--color-status);
        color:var(--color-status);
        overflow:hidden;
      }`
      };
	static get properties () {
		return {
      ws: Object,
		}
	}

  url = 'ws://localhost:8999'; // TODO: make this configurable from .env
	constructor () {
		super()
		this.wsStatus = 'Not Connected'
	}

  // Lit method
  connectedCallback() {
    super.connectedCallback()
    try {
			// this.ws = null
      console.log(this.url);
			this.ws = new window.WebSocket(this.url)
			this._setListeners()

		} catch (error) {
			// TODO
			this.ws = null
			this.wsStatus = 'error'
			// this._dispatchMsg('ws-error', error)
		}
  }

  _onOpen () {
		this.wsStatus = 'Open'
	}

	_onClose () {
    this.wsStatus = 'Close'
	}
	_onMessage (event) {
    this.wsStatus = (this.ws?.readyState)
    console.log(event);
  }

  _setListeners () {
		if (this.ws) {
			// bind WebSocket events to component events
			this.ws.addEventListener('open', this._onOpen.bind(this))
			this.ws.addEventListener('close', this._onClose.bind(this))
			this.ws.addEventListener('message', this._onMessage.bind(this))
			// this.ws.addEventListener('error', this._onError.bind(this))
		}
	}

  render() {
    return html`<div>WS</div>`;
  }
}
customElements.define('web-socket', WebSocketCmp);