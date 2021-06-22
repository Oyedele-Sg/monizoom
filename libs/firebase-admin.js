import * as admin from 'firebase-admin';

const serviceAccountJson = {
  "type": "service_account",
  "project_id": "moneyzoom-6bc8f",
  "private_key_id": "0dc13dc91fe4cc1c284559d47d9b5ad42e1eeea1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFvhE7xx4llGV/\nHGw1bvuwbTlrWLtv5nelseT0EjcczXKtOv7apA+RYeZpzcg5jcNhDqC73if8eZp7\n+Y1fIHZHcbPff1rK58Pu/c4qR4JHqq9GYRyQyVX5z5SwvepwSwkqFXr5BsJyQHMk\nIatAcgZEazuhJmDmhG1gZSaNleHRsOTJ7FJYOUpv2WoLsHilAWE8bskRZ5pjXYBF\nKJ1j4vyB3RXEHN20sNBtGklCn6Gc9lGbtJqwrBSZg/o8tWL0Xh2B8lSxTJPeIlJl\n63U3M2azKm6xGmefZgcaklSpDuEjPJeiEAloHCFvBX6djHbMxorz0pWCc/RHQiv1\ns63b8zuTAgMBAAECggEARrVEv03fo0txkabNsLurRzZ/SjnT6FsOXJMEjhv3VhbG\n01fdqrvwjyllNV8uohnli86pvhPd04N+MKeXHDVk5f4r9ha5lgWTA+IAtxCT7uGD\nRFTUXJeJ5UaLYjm+24GRWNmOe/6lSCpwobJiZKyBPjTkASdSjgs7ezUgOI+oTIzl\nXD0bnbzcAnfAeM7BnFAgR9qymUTQSUUF+2DzQomi5fDwYJ4z5Zlampu0AjXoxEl9\n28w8/YF9QPdp0tKPlXugL5o6kCIMjlNXOuETVdeexskB8IOvuE5xQf38efrMcQrX\nmyUfXsXALY+SSzH9Bix/cnfu28j5QzXB8LrSvEq5vQKBgQD3K8p+NmcBYrotlp/n\ne3zurJ7FJJQWClWgTGoxGUH7ui+PSqLFrTmhCSpSoSPYdSOU0CXlhOxAC6ifyx67\nK+DxJeIvnWmcTtRV7Kn2BxEyLs8Tbay8dQ318+PJNaUaidZE5o/K9BXab4OL0p1K\nTmRMVax30/lEk3iEeWWkCoptFwKBgQDMzkkoJ//PBp/zGf5mteOW8dAFdHBECtgG\nVSPsJZu/0FCpa4Pdgtg83ZnMbpxuvYpGzRjAgH+a2SYuErKnoTbzmH707QivjiA/\nHnUHXOPWnsjXKfUiqIrhLF7e0tv0eJpBKqrNz5VP5ztLC5oGFp8NVY9OP2C8VuUL\ncN6zXoFK5QKBgAsRu/zRBOXr/PiDsV+ViS/LLUUY8UTXa6RFJ9BRGEJkwTKCni2K\nJ3WNyoZuzwMno9NLSxcvT8FChGe7mgG54lYKY0nMm+kzIpFCiw4InP2JWR6+n6jE\n+T4VkRL2wxEgMSdex/vH2J6ytcpyQTcNsbI1eAbZyGUI0bHlGecxzac7AoGACUpu\nXSj7XMvjI6cROF2V9nn/ws+WbC/FvvvLxmGqYBg2IIllEP5nitNOr8xwwkFM7YtO\nTSVHJKInLj3g5uPUV1aao8fA9h3Pbq2WB4B6QXkwiTo5CZp1umNF5nvQSJXUAZLK\n7s0068wEj5H2KcKK8pLoDlenrsOOXmd/YsmtudUCgYEAhnyx+lLPbZlUripIPhzG\n7oH5hc+/JZ0SF56yo3wg/ZoO1Xhowt1R8M3gE3Zjgd4UZGsdvknWB6zqTAXneeBd\ndznphNse9yVy7QGWg+OVHO1K/3Iqj6MiuOqF2cJvqmBMwkNe6CgWrNkPjl+SNrDU\nhrVUq24eUxD2QP5DNjTrpdY=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-qdfmw@moneyzoom-6bc8f.iam.gserviceaccount.com",
  "client_id": "110694098833512559692",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qdfmw%40moneyzoom-6bc8f.iam.gserviceaccount.com"
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccountJson.project_id,
      clientEmail: serviceAccountJson.client_email,
      privateKey: serviceAccountJson.private_key.replace(/\\n/g, '\n'),
    }),
    databaseURL: "https://moneyzoom-6bc8f.firebaseio.com",
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth }