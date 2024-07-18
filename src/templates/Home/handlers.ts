import { HttpResponse, http } from "msw";


export const handlers = [
  http.get('*jsonplaceholder.typicode.com*', () => {
    return HttpResponse.json([
      {
        "id": 1,
        "title": "title 1",
        "body": "content 1",
        "url": "https://via.placeholder.com/600/92c952"
      },
      {
        "id": 2,
        "title": "title 2",
        "body": "content 2",
        "url": "https://via.placeholder.com/600/92c952"
      },
      {
        "id": 3,
        "title": "title 3",
        "body": "content 3",
        "url": "https://via.placeholder.com/600/92c952"
      }
    ]);
  })
];