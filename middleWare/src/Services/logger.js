const accessToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...f9TTwJd6-Wpze8VO5vL4kt0lTHcucnVEd5NyTOkdMKs"; // paste your full token

export async function logEvent(stack, level, pkg, message) {
  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: accessToken, // DO NOT break or change this
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message,
      }),
    });

    const data = await response.json();
    console.log("[ Log sent]", data.message);
  } catch (error) {
    console.error("[ Log failed]", error);
  }
}
