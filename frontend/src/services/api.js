/**
 * api.js  –  Kanban Board API service
 *
 * Replace BASE_URL with your Express server's base URL.
 * Replace route paths (e.g. /boards/:id/columns) with your actual routes.
 *
 * Expected MongoDB document shapes:
 *
 *   Board   { _id, title, columns: [columnId…] }
 *   Column  { _id, boardId, title, cards: [cardId…], order: Number }
 *   Card    { _id, columnId, content, description, labels, cover,
 *              dueDate, members, checklist: [{id,text,done}] }
 */

const BASE_URL = "http://localhost:5000/api"; // ← replace with your server URL

async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    // If you use JWT auth, add:  Authorization: `Bearer ${localStorage.getItem("token")}`
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.status === 204 ? null : res.json();
}

// ── Board ─────────────────────────────────────────────────────────────────────

/** GET /boards/:boardId  →  { board, columns, cards } */
export const fetchBoard = (boardId) =>
  request("GET", `/boards/${boardId}`);

/** PATCH /boards/:boardId  →  updated board */
export const updateBoardTitle = (boardId, title) =>
  request("PATCH", `/boards/${boardId}`, { title });

// ── Columns ───────────────────────────────────────────────────────────────────

/** POST /boards/:boardId/columns  →  new column */
export const createColumn = (boardId, title) =>
  request("POST", `/boards/${boardId}/columns`, { title });

/** PATCH /columns/:columnId  →  updated column */
export const updateColumn = (columnId, data) =>
  request("PATCH", `/columns/${columnId}`, data);

/** DELETE /columns/:columnId  →  204 */
export const deleteColumn = (columnId) =>
  request("DELETE", `/columns/${columnId}`);

/**
 * PATCH /boards/:boardId/columns/reorder
 * body: { orderedIds: [columnId, columnId, …] }
 */
export const reorderColumns = (boardId, orderedIds) =>
  request("PATCH", `/boards/${boardId}/columns/reorder`, { orderedIds });

// ── Cards ─────────────────────────────────────────────────────────────────────

/** POST /columns/:columnId/cards  →  new card */
export const createCard = (columnId, content) =>
  request("POST", `/columns/${columnId}/cards`, { content });

/** PATCH /cards/:cardId  →  updated card */
export const updateCard = (cardId, data) =>
  request("PATCH", `/cards/${cardId}`, data);

/** DELETE /cards/:cardId  →  204 */
export const deleteCard = (cardId) =>
  request("DELETE", `/cards/${cardId}`);

/**
 * PATCH /columns/:columnId/cards/reorder
 * body: { orderedIds: [cardId, …] }
 * Call this after a drag-drop reorder within the same column.
 */
export const reorderCards = (columnId, orderedIds) =>
  request("PATCH", `/columns/${columnId}/cards/reorder`, { orderedIds });

/**
 * PATCH /cards/:cardId/move
 * body: { toColumnId, orderedIds }
 * Call this when a card moves to a different column.
 */
export const moveCard = (cardId, toColumnId, orderedIds) =>
  request("PATCH", `/cards/${cardId}/move`, { toColumnId, orderedIds });
