import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import { ChatRoom } from '../components/room';
import { ChatMembers } from '../components/members';

export class PageHome extends PageElement {

  render() {
    return html`<section class="chat-wrapper">
        <chat-room></chat-room>
        <chat-members></chat-members>
      </section>`;
  }
}

customElements.define('page-home', PageHome);
