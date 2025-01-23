/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from "../utils/axiosClient";
import { errorResponse, successResponse } from "../utils/responseWrapper";

interface SignupRequestBody {
  email: string;
  username: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface CreatePlaylistRequestBody {
  name: string;
}

interface UpdatePlaylistRequestBody {
  name: string;
  songs?: any[];
}

interface AddSongToPlaylistRequestBody {
  song: any;
}

interface GetPlaylistByIdRequestBody {
  id: string;
}

interface ApiResponse {
  success: boolean;
  message: string | null;
  data: any;
}

export const onSignup = async (
  body: SignupRequestBody
): Promise<ApiResponse> => {
  try {
    const signup_api_url = `/auth/signup`;
    const result = await axiosClient.post(signup_api_url, body);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while signing up";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const onLogin = async (body: LoginRequestBody): Promise<ApiResponse> => {
  try {
    const login_api_url = `/auth/login`;
    const result = await axiosClient.post(login_api_url, body);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while logging in";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const createPlaylist = async (
  body: CreatePlaylistRequestBody
): Promise<ApiResponse> => {
  try {
    const create_playlist_api_url = `/playlists`;
    const result = await axiosClient.post(create_playlist_api_url, body);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while creating the playlist";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const getAllPlaylists = async (): Promise<ApiResponse> => {
  try {
    const get_playlists_api_url = `/playlists`;
    const result = await axiosClient.get(get_playlists_api_url);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while fetching playlists";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const updatePlaylist = async (
  playlistId: string,
  body: UpdatePlaylistRequestBody
): Promise<ApiResponse> => {
  try {
    const update_playlist_api_url = `/playlists/${playlistId}`;
    const result = await axiosClient.put(update_playlist_api_url, body);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while updating the playlist";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const deletePlaylist = async (
  playlistId: string
): Promise<ApiResponse> => {
  try {
    const delete_playlist_api_url = `/playlists/${playlistId}`;
    const result = await axiosClient.delete(delete_playlist_api_url);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while deleting the playlist";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const addSongToPlaylist = async (
  playlistId: string,
  body: AddSongToPlaylistRequestBody
): Promise<ApiResponse> => {
  try {
    const add_song_api_url = `/playlists/${playlistId}/add-song`;
    const result = await axiosClient.post(add_song_api_url, body);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while adding a song to the playlist";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};

export const getPlaylistById = async (
  body: GetPlaylistByIdRequestBody
): Promise<ApiResponse> => {
  try {
    const get_playlist_by_id_api_url = `/playlists/${body.id}`;
    const result = await axiosClient.get(get_playlist_by_id_api_url);
    return successResponse(result.data);
  } catch (error: any) {
    const errorMessage = "Error occurred while fetching the playlist";
    console.log(errorMessage, error);
    return errorResponse(error?.response?.data?.message || errorMessage);
  }
};
