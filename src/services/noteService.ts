import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string
): Promise<NotesHttpResponse> => {
  const response = await axios.get<NotesHttpResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage,
      search,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};
