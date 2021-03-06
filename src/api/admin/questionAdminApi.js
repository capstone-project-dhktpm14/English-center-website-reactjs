import axiosClient from 'api/axiosClient';

const BASE_URL = '/admin/exams/questions';

const questionApi = {
  fetchQuestions: (params) => {
    return axiosClient.get(BASE_URL, { params });
  },

  updateQuestion: (id, question) => {
    const url = `${BASE_URL}/${id}`;
    return axiosClient.put(url, question);
  },

  updateQuestionImage: (id, image) => {
    const url = `${BASE_URL}/${id}/image`;
    console.log(image);
    return axiosClient.put(url, image);
  },

  updateQuestionAudio: (id, audio) => {
    const url = `${BASE_URL}/${id}/audio`;
    console.log(audio);
    return axiosClient.put(url, audio);
  },
};

export default questionApi;
