import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  login,
  register,
  listConversations
} from './messengerApi.js';

import LoginForm
  from './LoginForm.jsx';

import ConversationList
  from './ConversationList.jsx';

import CreateConversationForm
  from './CreateConversationForm.jsx';

import ConversationPanel
  from './ConversationPanel.jsx';

import { io }
  from 'socket.io-client';

export default function App() {
  const [session, setSession] =
    useState(null);

  const [
    loginBusy,
    setLoginBusy
  ] = useState(false);

  const [
    loginError,
    setLoginError
  ] = useState('');

  const [conversations, setConversations] =
    useState([]);

  const [
    selectedId,
    setSelectedId
  ] = useState(null);

  const [
    creatingConversation,
    setCreatingConversation
  ] = useState(false);

  const [
    conversationsBusy,
    setConversationsBusy
  ] = useState(false);

  const [
    conversationsError,
    setConversationsError
  ] = useState('');

  const endSession =
    useCallback(
      (message = '') => {
        setSession(null);
        setConversations([]);
        setSelectedId(null);
        setLoginError(message);
      },
      []
    );

  async function handleLogin(
    username,
    password
  ) {
    setLoginBusy(true);
    setLoginError('');

    try {
      const result =
        await login(
          username,
          password
        );

      setSession({
        token: result.token,
        user: result.user
      });
    } catch (err) {
      setLoginError(
        err.message
      );
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleRegister(
    username,
    password
  ) {

    setLoginBusy(true);

    setLoginError('');

    try {
      await register(
	username,
	password
      );

      const loginResult =
	await login(
	  username,
	  password
	);

      setSession({
	token:
	  loginResult.token,
	user:
	  loginResult.user
	});
  } catch (err) {
    setLoginError(
      err.message
    );

  } finally {
    setLoginBusy(false);
  }
}


  useEffect(() => {
    if (session === null) {
      return;
    }

    const controller =
      new AbortController();

    setConversationsBusy(true);
    setConversationsError('');

    listConversations(
      session.token,
      controller.signal
    )
      .then(result => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setConversations(
          result.conversations
        );

        setSelectedId(
          result.conversations[0]?.id ??
            null
        );
      })
      .catch(err => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        if (
          err.status === 401
        ) {
          endSession(
            'Session expired. Log in again.'
          );
        } else {
          setConversationsError(
            `Cannot load conversations: ${err.message}`
          );
        }
      })
      .finally(() => {
        if (
          !controller.signal.aborted
        ) {
          setConversationsBusy(false);
        }
      });

    return () =>
      controller.abort();
  }, [session, endSession]);

useEffect(() => {

  if (session === null) {
	return;
  }

  const socket =
    io({
      auth: {
        token:
          session.token
      }
    });

  socket.on(
    'conversation:new',
    conversation => {

      setConversations(
        current => {

	  const exists =
	    current.some(
	      item =>
		item.id ===
		conversation.id
	    );

	  if (exists) {
	    return current;
	  }

	  return [
	    conversation,
	    ...current
	  ];
	}
      );

    }
  );
 
  return () => {
    socket.disconnect();
  };

}, [session]);

  if (session === null) {
    return (
      <main>
        <h1>
          Messenger
        </h1>

        <LoginForm
          onLogin={handleLogin}
	  onRegister={handleRegister}
          busy={loginBusy}
          error={loginError}
        />
      </main>
    );
  }

  const selectedConversation =
    conversations.find(
      conversation =>
        conversation.id ===
        selectedId
    );

  return (
    <main>
      <header className="app-header">
        <h1>
          Messenger
        </h1>

        <p>
          Signed in as{' '}
          {
            session.user
              .username
          }
        </p>

        <button
          type="button"
          onClick={() =>
            endSession()
          }
        >
          Log out
        </button>
      </header>

      {conversationsBusy && (
        <p role="status">
          Loading conversations...
        </p>
      )}

      {conversationsError && (
        <p role="alert">
          {conversationsError}
        </p>
      )}


  <div className="messenger-layout">

    <aside className="conversation-sidebar">
      <ConversationList
	conversations={conversations}
	selectedId={selectedId}
	onSelect={setSelectedId}
        onCreateConversation={() =>
          setCreatingConversation(
            current => !current
          )
        }
      />
     </aside>

     <section className="conversation-main">

       {creatingConversation && (
         <CreateConversationForm
           token={session.token}
           currentUserId={session.user.id}
	   onCreated={conversation => {

	     setConversations(
	        current => {

		  const exists = 
		    current.some(
		      candidate =>
			candidate.id ===
			conversation.id
		    );
		  if (exists) {
		    return current;
		  }

		  return [
		    conversation,
		    ...current
		  ];
		}
	      );

	      setSelectedId(
		conversation.id
	      );

	      setCreatingConversation(
		false
	      );
	    }}
	  />
        )}





       {selectedConversation && (
	<ConversationPanel
	  key={selectedConversation.id}
	  conversationId={selectedConversation.id}
	  token={session.token}
	  userId={session.user.id}
	  onUnauthorized={endSession}
        />
      )}

    </section>

  </div>


  </main>
 );
}
