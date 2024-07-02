
export async function send_email(email) {
    const url = `/api/sendmail`;
  
    const post_request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        redirect: "follow",
      },
      body: JSON.stringify({email}), // Stringify formData here
    });
  
    if (post_request.ok) {
      const response = await post_request.json();
      if (response.message=="email sent") {
        return true;
      }
    }
    return false;
  }
  