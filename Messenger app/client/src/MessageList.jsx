// client/src/MessageList.jsx
export default function MessageList({
  messages,
  userId
}) {
  if (messages.length === 0) {
    return (
      <p>
        No messages yet.
      </p>
    );
  }
  
  return (
    <ul className="messages">
      {messages.map(
        (message) => {
          const ownMessage =
            userId !== undefined &&
            message.senderId === userId;
          return (
            <li
              key={message.id}
            >
              <strong>
                {ownMessage
                  ? 'You'
                  : (
                      message.senderId
                        ? `Member ${message.senderId.slice(0, 6)}`
                        : 'Member'
                    )}
              </strong>
              <time
                dateTime={message.createdAt}
              >
                {new Date(
                  message.createdAt
                ).toLocaleString()}
              </time>
              <p>
                {message.body}
              </p>
            </li>
          );
        }
      )}
    </ul>
  );
}
