let token = '';
export async function fetchAuthToken() {
  const res = await fetch('http://20.244.56.144/evaluation-service/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'ramkrishna@abc.edu',
      name: 'ram krishna',
      rollNo: 'aalbb',
      accessCode: 'xgAsNC',
      clientID: 'd9cbb699-6a27-44a5-8d59-8b1befa816da',
      clientSecret: 'tVJaaaRBSeXcRXe™'
    })
  });
  const data = await res.json();
  token = data.access_token;
}

export function getToken() {
  return token;
}
