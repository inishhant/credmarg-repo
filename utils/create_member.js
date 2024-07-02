export async function create_member(type, formData) {
  const url = `/api/${type}`;

  const post_request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      redirect: "follow",
    },
    body: JSON.stringify(formData), // Stringify formData here
  });

  if (post_request.ok) {
    const response = await post_request.json();
    if (response._id) {
      return true;
    }
  }
  return false;
}

export async function update_member(id, updatedData) {
  const url = `/api/update`;

  const post_request = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      redirect: "follow",
    },
    body: JSON.stringify({ id, body: updatedData }), // Stringify formData here
  });

  if (post_request.ok) {
    const response = await post_request.json();
    if (response._id) {
      return true;
    }
  }
  return false;
}
