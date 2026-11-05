import {
  useEffect,
  useState
} from 'react';

import {
  listUsers,
  createDirectConversation
} from './messengerApi.js';

export default function CreateConversationForm({
  token,
  currentUserId,
  onCreated
}) {
  const [users, setUsers] =
    useState([]);

  const [selectedUserId, setSelectedUserId] =
    useState('');

  const [
    conversationType,
    setConversationType
  ] = useState('direct');

  const [
    groupTitle,
    setGroupTitle
  ] = useState('');

  const [
    selectedUsers,
    setSelectedUsers
  ] = useState([]);

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const [creating, setCreating] =
    useState(false);

  useEffect(() => {
    const controller =
      new AbortController();

    listUsers(
      token,
      controller.signal
    )
      .then(result => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setUsers(
          result.users.filter(
            user =>
              user.id !== currentUserId
          )
        );
      })
      .catch(err => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setError(
          err.message
        );
      })
      .finally(() => {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      });

    return () =>
      controller.abort();
  }, [
    token,
    currentUserId
  ]);

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (
      selectedUserId === ''
    ) {
      return;
    }

    if (
      conversationType ===
      'direct'
    ) {

      const user =
        users.find(
          candidate =>
            candidate.id ===
            selectedUserId
        );

      if (!user) {
        return;
      }

      const result =
        await createDirectConversation(
          token,
          user.username
        );

      onCreated(
        result.conversation
      );

    } else {

      const memberNames =
        users
          .filter(
            user =>
              selectedUsers.includes(
                user.id
              )
          )
          .map(
            user =>
              user.username
          );

      const result =
        await createGroupConversation(
          token,
          groupTitle,
          memberNames
        );

      onCreated(
        result.conversation
      );
    }

    } catch (err) {
      setError(
        err.message
      );
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <p>
        Loading users...
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h3>
        New Conversation
      </h3>

      {error && (
        <p role="alert">
          {error}
        </p>
      )}

    <label>
      <input
	type="radio"
	checked={
          conversationType ===
	  'direct'
	}
	onChange={() =>
	  setConversationType(
	    'direct'
	  )
	}
      />
      Direct Message
    </label>

    <label>
      <input
	type="radio"
	checked={
	  conversationType ===
	  'group'
	}
	onChange={() =>
	  setConversationType(
	    'group'
	  )
	}
      />
      Group Chat
    </label>

    {conversationType ===
      'group' && (
	<input
	  placeholder="Group Name"
	  value={groupTitle}
	  onChange={event =>
	    setGroupTitle(
	      event.target.value
	    )
	  }
	/>
    )}

      <select
        value={selectedUserId}
        onChange={event =>
          setSelectedUserId(
            event.target.value
          )
        }
      >
        <option value="">
          Select a user
        </option>

        {users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.username}
          </option>
        ))}
      </select>



      <button
        disabled={creating}
      >
        {creating
          ? 'Creating...'
          : 'Create Direct Message'}
      </button>
    </form>
  );
}


