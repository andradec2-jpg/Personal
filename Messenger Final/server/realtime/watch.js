import { io } from 'socket.io-client';

const token = process.env.TOKEN;
const conversationId = process.env.Conversation_ID;

if (!token || !conversationId) {
  throw new Error(
    'Set TOKEN and Conversation_ID'
  );
}

const seen = new Set();

function display(message, source) {
  if (seen.has(message.id)) {
    return;
  }

  seen.add(message.id);

  console.log(
    `${source}: ${message.body} (${message.id})`
  );
}

const socket = io(
  'http://127.0.0.1:3000',
  {
    auth: { token }
  }
);

socket.on(
  'message:new',
  message => {
    if (message?.conversationId === conversationId) {
      display(message, 'live');
    }
  }
);

socket.on(
  'connect_error',
  err => {
    console.error(
      `Connection rejected: ${err.message}`
    );
  }
);

socket.on(
  'disconnect',
  reason => {
    console.log(
      `Disconnected: ${reason}`
    );
  }
);

async function recoverHistory() {
  const collected = [];
  let before = null;

  do {
    const url = new URL(
      `http://127.0.0.1:3000/api/conversations/${conversationId}/messages`
    );

    if (before !== null) {
      url.searchParams.set(
        'before',
        before
      );
    }

    const response =
      await fetch(url, {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      });

    if (!response.ok) {
      throw new Error(
        `History HTTP ${response.status}`
      );
    }

    const page =
      await response.json();

    collected.push(
      ...page.messages
    );

    before = page.nextBefore;
  } while (before !== null);

  for (
    const message of collected.reverse()
  ) {
    display(message, 'history');
  }
}

socket.on(
  'connect',
  async () => {
    try {
      const joined =
        await socket
          .timeout(5000)
          .emitWithAck(
            'conversation:join',
            { conversationId }
          );

      if (joined.ok === false) {
        console.error(
          `Join denied: ${joined.code}`
        );

        socket.disconnect();

        return;
      }

      console.log(
        'Joined the authorized conversation'
      );

      await recoverHistory();
    } catch (err) {
      console.error(
        `Join or history failed: ${err.message}`
      );
    }
  }
);
