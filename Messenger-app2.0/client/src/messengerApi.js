export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function requestJson(
  path,
  {
    token,
    method = 'GET',
    body,
    signal
  } = {}
) {
  const headers = {};

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers['Content-Type'] =
      'application/json';
  }

  let response;

  try {
    response = await fetch(
      path,
      {
        method,
        headers,
        body:
          body === undefined
            ? undefined
            : JSON.stringify(body),
        signal
      }
    );
  } catch (err) {
    if (
      err.name ===
      'AbortError'
    ) {
      throw err;
    }

    throw new ApiError(
      'Cannot reach the API',
      0
    );
  }

  const data =
    await response.json();

  if (
    response.ok === false
  ) {
    throw new ApiError(
      data.error ??
        `HTTP ${response.status}`,
      response.status
    );
  }

  return data;
}

export function login(
  username,
  password
) {
  return requestJson(
	'/api/auth/login',
	{
  	method: 'POST',
  	body: {
    	username,
    	password
  	}
	}
  );
}
export function listConversations(
  token,
  signal
) {
  return requestJson(
	'/api/conversations',
	{
  	token,
  	signal
	}
  );
}
export function getConversation(
  token,
  conversationId,
  signal
) {
  return requestJson(
	`/api/conversations/${encodeURIComponent(
  	conversationId
	)}`,
	{
  	token,
  	signal
	}
  );
}
export function listMessages(
  token,
  conversationId,
  signal
) {
  return requestJson(
	`/api/conversations/${encodeURIComponent(
  	conversationId
	)}/messages`,
	{
  	token,
  	signal
	}
  );
}
export function sendMessage(
  token,
  conversationId,
  body
) {
  return requestJson(
	`/api/conversations/${encodeURIComponent(
  	conversationId
	)}/messages`,
	{
  	token,
  	method: 'POST',
  	body: { body }
	}
  );
}

export function listUsers(
  token,
  signal
) {
  return requestJson(
	'/api/conversations/users',
	{
  	token,
  	signal
	}
  );
}

export function createDirectConversation(
  token,
  username
) {
  return requestJson(
	'/api/conversations/direct',
	{
  	token,
  	method: 'POST',
  	body: {
    	username
  	}
	}
  );
}
export function createGroupConversation(
  token,
  title,
  members
) {
  return requestJson(
	'/api/conversations/group',
	{
  	token,
  	method: 'POST',
  	body: {
    	title,
    	members
  	}
	}
  );
}

