export default function ConversationList({
  conversations,
  selectedId,
  onSelect
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
      <h2>
        Conversations
      </h2>

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


