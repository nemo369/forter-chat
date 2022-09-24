import config from "../config";

const MessageService = {
     getPreviousMessages: async () => {
        const response = await fetch(`${config.apiUrl}/messages`);
        const data = await response.json();
        return data;
    }
}

export {MessageService}