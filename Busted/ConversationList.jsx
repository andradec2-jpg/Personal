export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
  userLookup,
  onCreateConversation
}) {

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

    {conversations.length === 0 ? (

      <p>
        No conversations yet.
      </p>

    ) : (

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
                  conversation.type === 'direct'
		    ? (
			userLookup?.[
			  conversation.members.find(
			    memberId =>
			      memberId !==
			      currentUserId
			  )
		        } ?? 'Direct Conversation'
		      )
                    : conversation.title
                }
              </button>
            </li>
          )
        )}
      </ul>
    )}
  </nav>
  );
}


