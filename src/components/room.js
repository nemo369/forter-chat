import { html } from './base';
import './room/messages';
import './room/input';

export const ChatRoom = () => {
  return html`
    <room-messages></room-messages>
    <room-input></room-input>
  `;
};
