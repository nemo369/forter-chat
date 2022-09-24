import { LitElement, html, css } from './components/base';

import config from './config';

import { attachRouter, urlForName } from './router';
// visit https://components.forter.dev for more
import '@forter/checkbox';
import '@forter/button';
import '@forter/radio';

import 'pwa-helper-components/pwa-install-button.js';
import 'pwa-helper-components/pwa-update-available.js';
import { AppHeader } from './components/header';
import { AppFooter } from './components/footer';
import { MessageService } from './services/message.service';
import { NEW_MESSAGE_EVENT } from './helpers/consts';
export { WebSocketCmp } from './components/web-socket';

export class App extends LitElement {
  render() {
    return html`${AppHeader()}
    <web-socket></web-socket>
    <pwa-install-button>
              <button>Install app</button>
            </pwa-install-button>
            <pwa-update-available>
              <button>Update app</button>
            </pwa-update-available>
          </div>
        </div>
    </header>

      <!-- The main content is added / removed dynamically by the router -->
      <main role="main"></main>

      ${AppFooter()}`;
  }

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    attachRouter(this.querySelector('main'));
    setTimeout(this.getData, 300);
  }

  async getData() {
    const messages = await MessageService.getPreviousMessages();
    const event = new CustomEvent(NEW_MESSAGE_EVENT,{detail:messages});
    window.dispatchEvent(event);
  }
}

customElements.define('app-index', App);
