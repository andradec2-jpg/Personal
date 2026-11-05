import {
  useEffect,
  useRef,
  useState
} from 'react';

import { io }
  from 'socket.io-client';

import {
  getConversation,
  listMessages
} from './messengerApi.js';

import MessageList
  from './MessageList.jsx';

export default function ConversationPanel({
  conversationId,
  token,
  userId
}) {

  const [
    conversation,
    setConversation
  ] = useState(null);

  const [
    socketStatus,
    setSocketStatus
  ] = useState('connecting');

  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState('');

  const [
    text,
    setText
  ] = useState('');

  const [
    sending,
    setSending
  ] = useState(false);

  const socketRef =
    useRef(null);

  const messageRef =
    useRef(null);

  useEffect(() => {

    const controller =
       new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError('');
        
        const [
          conversationResult,
          messageResult
        ] =
          await Promise.all([
            getConversation(
              token,
              conversationId,
              controller.signal
            ),
            listMessages(
              token,
              conversationId,
              controller.signal
            )
          ]);
        
        if (
          controller.signal
            .aborted
        ) {
          return;
        }
    
        setConversation(
         conversationResult
            .conversation
        );
        
        setMessages(
          messageResult
            .messages
        );
      } catch (err) {
        
        if (
          controller.signal
            .aborted
        ) {
          return;
        }
        
        setError(
          err.message
        );
      } finally {
    
        if (
          controller.signal
            .aborted ===
          false
        ) {
          setLoading(false);
        }
      }
    }

    void load();

    return () =>
      controller.abort();
  }, [
    conversationId,
    token
  ]);


useEffect(() => {
  const socket =
    io({
      auth: { token },
      autoConnect: false
    });
  socketRef.current =
    socket;
  socket.on(
    'message:new',
    message => {
      if (
        message
          ?.conversationId ===
        conversationId
      ) {
        setMessages(
          current =>
            mergeMessages(
              current,
              [message]
            )
        );
      }
    }
  );
  socket.on(
    'connect_error',
    err => {

      setSocketStatus(
        'offline'
      );

      setError(
        'Socket unavailable: ${err.message}'
      );
    }
  );

socket.on(
  'connect',
  async () => {
    try {
      const joined =
        await socket
          .timeout(5000)
          .emitWithAck(
            'conversation:join',
            {
              conversationId
            }
          );


      console.log(
        'conversation:join result',
	joined
      );


      if (
        joined.ok === false
      ) {
        setError(
	  `Conversation join failed: ${joined.code}`
        );
        socket.disconnect();
        return;
      }

      setSocketStatus('live');

      const result =
        await listMessages(
          token,
          conversationId
        );
      setMessages(
        current =>
          mergeMessages(
            current,
            result.messages
          )
      );
    } catch (err) {
      setError(
        err.message
      );
     socket.disconnect();
    }
  }
);

socket.on(
  'disconnect',
  () => {
    setSocketStatus(
      'offline'
    );
  }
);

  socket.connect();
  return () => {
    socket
      .removeAllListeners();
    socket.disconnect();
    if (
      socketRef.current ===
      socket
    ) {
      socketRef.current =
        null;
    }
  };
}, [
  conversationId,
  token
]);

useEffect(() => {
  const container =
	messageRef.current;
  if (!container) {
	return;
  }
  container.scrollTop =
	container.scrollHeight;
}, [messages]);


  async function
  handleSubmit(event) {

	event.preventDefault();

	const body =
         text.trim();
	
        if (
          body.length < 1 ||
          sending
	) {
          return;
	}
	
        try {
          
          setSending(true);
          
	  const socket =
	    socketRef.current;

	  if (!socket?.connected  ) {
	    throw new Error(
		'Conversation is offline'
	    );
	  }
	    const result =
	      await socket
		.timeout(5000)
		.emitWithAck(
		  'message:send',
		  {  
		    conversationId,
		    body
		  }
		);
	  setMessages(
	    current =>
	      mergeMessages(
		current,
		[result.message]
	      )
	  );
  
          setText('');
	
        } catch (err) {
    
          setError(
            err.message
          );
	
        } finally {
          
          setSending(false);
	
        }
      }

  if (loading) {
    return (
      <p>
        Loading conversation...
      </p>
    );
  }
  
  return (
    <section className="conversation-panel">
      <h2>
        {
          conversation
            ?.title ??
          'Direct Conversation'
        }
      </h2>
      
      {error && (
        <p role="alert">
          {error}
        </p>
      )}

  <div 
    className="message-history"
    ref={messageRef}
  >
    <MessageList
      messages={messages}
      userId={userId}
    />
  </div>
      
      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          value={text}
          disabled={sending}
          onChange={
            event =>
              setText(
                event.target
                  .value
              )
          }
        />
        
        <button
          disabled={sending}
        >
          {
            sending
              ? 'Sending...'
              : 'Send'
          }
        </button>
      </form>

    </section>
  );
}
         


function mergeMessages(
  current,
  incoming
) {
  const byId =
    new Map(
      current.map(
        message => [
          message.id,
          message
        ]
      )
    );
  
  for (
    const message
    of incoming
  ) {
    byId.set(
      message.id,
      message
    );
  }
  
  return [
    ...byId.values()
  ].sort(
    (a, b) =>
      Date.parse(
        a.createdAt
      ) -
      Date.parse(
        b.createdAt
      )
  );
}

