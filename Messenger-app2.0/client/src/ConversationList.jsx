export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  onCreateConversation
}) {
  if (conversations.length === 0) {
	return (
	<p>
	No conversations yet.
	</p>
	);
  }
  return (
    <nav
      aria-label="Your conversations"
    >
    <div className="conversation-header">
      <h2>
        Conversations
      </h2>

      <button
        type="button"
        onClick={
          onCreateConversation
        }
      >
        + New
      </button>
    </div>

      <ul>
        {conversations.map(
          (conversation) => (
            <li
              key={
                conversation.id
              }
            >
              <button
                type="button"
                aria-current={
                  selectedId ===
                  conversation.id
                    ? 'page'
                    : undefined
                }
                onClick={() =>
                  onSelect(
                    conversation.id
                  )
                }
              >
                {
                  conversation.type ===
                  'direct'
                    ? 'Direct Conversation'
                    : conversation.title
                }
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}


