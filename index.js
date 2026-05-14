const axios = require("axios");

async function run() {

  console.log("Pinterest Auto Pin Bot Started");

  try {

    const response = await axios.get(
      "https://prompt.image-extractor.com/wp-json/wp/v2/posts?per_page=5"
    );

    const posts = response.data;

    console.log("Posts Found:", posts.length);

    for (const post of posts) {

      console.log("Post Title:", post.title.rendered);

    }

  } catch (err) {

    console.log("Error:", err.message);

  }

}

run();
