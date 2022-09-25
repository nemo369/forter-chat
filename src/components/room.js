import { html } from './base';

export const ChatRoom = () => {
  return html`
    <room-messages></room-messages>
    <room-input></room-input>
  `;
};
