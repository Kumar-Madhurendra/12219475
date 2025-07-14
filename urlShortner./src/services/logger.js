import { getToken } from './auth';

export async function logEvent(stack, level, pkg, message) {
  const token = getToken();
  if (!token) return;

  await fetch('http://20.244.56.144/evaluation-service/logs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcnJvdXNoYW4xOTYxQGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3MTczMiwiaWF0IjoxNzUyNDcwODMyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDlkNTY2YzYtYTk1Ny00YTFiLTg1ZDItMjljNGVhMGRjOGRlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia3VtYXIgbWFkaHVyZW5kcmEiLCJzdWIiOiI4N2Y4OWE0YS04ZGNkLTRjOTktYmNjMi0wOTEyNmM4YjdiYjEifSwiZW1haWwiOiJrcnJvdXNoYW4xOTYxQGdtYWlsLmNvbSIsIm5hbWUiOiJrdW1hciBtYWRodXJlbmRyYSIsInJvbGxObyI6IjEyMjE5NDc1IiwiYWNjZXNzQ29kZSI6IkNaeXBRSyIsImNsaWVudElEIjoiODdmODlhNGEtOGRjZC00Yzk5LWJjYzItMDkxMjZjOGI3YmIxIiwiY2xpZW50U2VjcmV0IjoiUHBHZGtwaE1SYUF3RWtaayJ9.f9TTwJd6-Wpze8VO5vL4kt0lTHcucnVEd5NyTOkdMKs}`,
      'Content-Type': 'application/json'   
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message
    })
  });
}
